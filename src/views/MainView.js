// Overall view for the main list page *and occurrence side panels*

import htmlLayout from "../templates/mainViewLayout.html";
import welcomeContent from "../templates/welcome.html";
import defaultRightHandSideHelp from "../templates/defaultRightHandSideHelp.html";
import {NyphSurveyForm} from "./forms/NyphSurveyForm";
import {NyphSurveyFormAboutSection} from "./forms/NyphSurveyFormAboutSection";
import {NyphApp} from "../framework/NyphApp";
import {NyphOccurrenceForm} from "./forms/NyphOccurrenceForm";
import {
    Form,
    ImageField, EVENT_DELETE_IMAGE, IMAGE_MODAL_ID, IMAGE_MODAL_DELETE_BUTTON_ID, DELETE_IMAGE_MODAL_ID,
    InternalAppError,
    MainController,
    Occurrence,
    OccurrenceImage,
    Page, escapeHTML, doubleClickIntercepted, App, Survey, DateField
} from "bsbi-app-framework";
import {NyphSurveyFormSurveySection} from "./forms/NyphSurveyFormSurveySection";

const LEFT_PANEL_ID = 'col1panel';
const RIGHT_PANEL_ID = 'col2panel';
const CONTROL_PANEL_ID = 'ctrlpanel';

const PANEL_BACK_BUTTON_ID = 'right-panel-back';

const PANEL_LEFT = 'left';
const PANEL_RIGHT = 'right';

const DELETE_OCCURRENCE_MODAL_ID = 'deleteoccurrencemodal';
const FINISH_MODAL_ID = 'finishmodal';

const OCCURRENCE_LIST_CONTAINER_ID = 'occurrencelistcontainer';
NyphSurveyForm.registerSection(NyphSurveyFormAboutSection);
NyphSurveyForm.registerSection(NyphSurveyFormSurveySection);

export class MainView extends Page {

    /**
     * @type {MainController}
     */
    controller;

    /**
     *
     * @type {Object.<string, NyphSurveyForm>}
     */
    #surveyFormSections = {};

    /**
     * @type {NyphOccurrenceForm}
     */
    #occurrenceForm;

    /**
     * keyed by occurrence id
     *
     * @type {{}}
     */
    #occurrenceChangeHandles = {};

    /**
     * @type {(''|'help'|'form')}
     */
    panelKey = '';

    /**
     * configuration flag
     * modify this for alternative survey types that finish with a general form section
     *
     * @type {boolean}
     */
    OCCURRENCES_ARE_LAST_SECTION = true;

    /**
     * @type {string}
     */
    recordsHeaderListDescriptorId;

    /**
     * @type {string}
     */
    pathPrefix;

    constructor() {
        super();

        // mainly aiming to determine whether '/app/' or '/testapp/'
        this.pathPrefix = window.location.pathname.split('/')[1];
    }

    /**
     * called once during late-stage app initialisation
     * (NB this may not be the current view when called)
     *
     * an opportunity to register listeners on this.controller.app
     */
    initialise() {
        this.controller.app.addListener(App.EVENT_OCCURRENCE_ADDED, this.occurrenceAddedHandler.bind(this));
    }

    /**
     * called before display to initialise a two-panel layout
     */
    setLayout() {
        const bodyEl = document.getElementById('body');
        bodyEl.innerHTML = htmlLayout;

        // register handler on right-pane back button
        document.getElementById(PANEL_BACK_BUTTON_ID).addEventListener('click', (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();

            this.fireEvent(MainController.EVENT_BACK);
        });
    }

    /**
     * need to ensure that the open accordion sections match the url
     * do this by class tweaking, so that handlers do not fire
     *
     * @todo for survey sections should enforce that the first invalid or empty section is always opened
     */
    refreshLeftPanelAccordionState() {
        const cards = document.querySelectorAll(`div#${this.leftPanelAccordionId} div[data-parent="#${this.leftPanelAccordionId}"].collapse`);
        let targetMatch;

        if (this.controller.viewSubcontext) {
            targetMatch = (this.controller.viewSubcontext === 'record') ?
                'record' : this.controller.surveySection;
        } else {
            targetMatch = '';
        }

        for (let card of cards) {
            let parentDiv = card.parentElement;
            if (parentDiv.classList.contains('is-invalid')) {
                // don't ever hide invalid sections
                card.classList.add('show');
            } else {
                let cardSection = card.getAttribute('data-sectionkey');

                if (cardSection === targetMatch) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            }
        }

        this._refreshOccurrenceAccordionState();
    }

    /**
     * collapse open occurrence cards that don't match the current occurrence id
     *
     * @private
     */
    _refreshOccurrenceAccordionState() {
        const occurrenceCards = document.querySelectorAll(`div#${OCCURRENCE_LIST_CONTAINER_ID} div[data-parent="#${OCCURRENCE_LIST_CONTAINER_ID}"].collapse`);

        const targetMatch = this.controller.currentOccurrenceId;

        for (let card of occurrenceCards) {
            let cardOccurrenceId = card.getAttribute('data-occurrenceid');

            if (cardOccurrenceId === targetMatch) {
                card.classList.add('show');
            } else {
                card.classList.remove('show');
            }
        }
    }

    display() {
        if (this.controller.needsFullRefresh) {
            console.log('Full refresh triggered.');
            this.setLayout();
            this.#populateLeftPanel();
        } else {
            // need to ensure that the open accordion sections match the url
            this.refreshLeftPanelAccordionState();
        }

        if (this.controller.needRightPanelRefresh) {
            // the view of the current record (in the right-hand editor pane)
            // has changed and needs rebuilding from scratch
            switch (this.controller.viewSubcontext) {
                case 'record':
                    this.#refreshOccurrenceEditor();
                    break;

                case 'survey':
                    this.#refreshSurveyHelpPanel();
                    break;

                default:
                    this.#displayDefaultRightPanel();
            }
        }

        this.setResponsivePanel('' === this.panelKey ?
            PANEL_LEFT
            :
            PANEL_RIGHT
        );
    }

    #refreshSurveyHelpPanel() {
        let rightPanelContainer = document.getElementById(RIGHT_PANEL_ID);
        rightPanelContainer.scrollTop = 0;

        const sectionKey = this.controller.surveySection;

        // section key can be 'welcome' which is a special case that doesn't match a section form
        let help = NyphSurveyForm.sectionsByKey[sectionKey] ?
            NyphSurveyForm.sectionsByKey[sectionKey].help
            :
            '';

        if (help) {
            rightPanelContainer.innerHTML = help;
        } else if (sectionKey === 'welcome') {
            rightPanelContainer.innerHTML = defaultRightHandSideHelp;
        } else {
            // shouldn't get here
            rightPanelContainer.innerHTML = `<p>placeholder survey help content for '${sectionKey}'</p>`;
        }

        this.controller.app.router.updatePageLinks(); // required in case help text contains any Navigo links
    }

    #refreshOccurrenceEditor() {
        try {
            let occurrence = this.controller.currentOccurrence;

            let editorContainer = document.getElementById(RIGHT_PANEL_ID);
            if (occurrence) {
                if (!this.#occurrenceForm || this.#occurrenceForm.occurrenceId !== occurrence.id) {
                    if (this.#occurrenceForm) {
                        this.#occurrenceForm.destructor();
                    }

                    // form has not been initialised or current occurrence has changed
                    this.#occurrenceForm = occurrence.setForm(new NyphOccurrenceForm(occurrence));
                    this.#occurrenceForm.surveyId = this.controller.app.currentSurvey.id;

                    // scroll to the top of the panel
                    console.log('scrolling to top of occurrence');
                    editorContainer.scrollTop = 0;
                }
                editorContainer.innerHTML = '';

                const formEl = this.#occurrenceForm.formElement;

                editorContainer.appendChild(formEl);
                this.#occurrenceForm.populateFormContent();

                if (occurrence.isNew) {
                    console.log('Firing event for initialisation of new occurrence.');
                    this.#occurrenceForm.fireEvent(Form.EVENT_INITIALISE_NEW, {survey : this.controller.app.currentSurvey}); // allows first-time initialisation of dynamic default data, e.g. starting a GPS fix
                } else {
                    console.log('Firing event for initialisation of new occurrence.');
                    this.#occurrenceForm.fireEvent(Form.EVENT_INITIALISED, {survey : this.controller.app.currentSurvey}); // allows re-initialisation of dynamic default data, e.g. setting a default geo-ref based on the survey
                }

                this.refreshOccurrenceFooterControls(editorContainer);

                // ensures that the accordion matches the navigation state
                $(`#description_${occurrence.id}`).collapse('show');
            } else {
                this.#displayDefaultRightPanel(NyphOccurrenceForm.help);
            }
        } catch (error) {
            console.log({error});
            let editorContainer = document.getElementById(RIGHT_PANEL_ID);

            if (editorContainer) {
                editorContainer.innerHTML = `<p>${error.message}</p>`;
            } else {
                document.body.innerHTML = `<h2>Internal error</h2><p>Please report this problem:</p><p>${error.message}</p>`;
            }
        }
    }

    /**
     * adds next/new and finish/close button to below right-panel occurrence editor
     * @param {HTMLElement} editorContainer
     */
    refreshOccurrenceFooterControls(editorContainer) {
        let nextSection;

        const buttonContainer = editorContainer.appendChild(document.createElement('div'));

        const backButton = buttonContainer.appendChild(document.createElement('button'));
        backButton.className = 'btn btn-secondary btn-md-lg mt-2 mb-3 mr-2';
        backButton.type = 'button';
        backButton.textContent = 'back to list';
        backButton.setAttribute('data-buttonaction', 'back');

        if (this.occurrenceIsMostRecent(this.controller.currentOccurrence)) {
            const addNewButton = buttonContainer.appendChild(document.createElement('button'));
            addNewButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3 mr-2';
            addNewButton.type = 'button';
            addNewButton.textContent = 'add another';
            addNewButton.setAttribute('data-buttonaction', 'new');
        }

        if (this.OCCURRENCES_ARE_LAST_SECTION) {
            const finishButton = buttonContainer.appendChild(document.createElement('button'));
            finishButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
            finishButton.type = 'button';
            finishButton.textContent = 'finish';
            finishButton.setAttribute('data-buttonaction', 'finish');
        } else {
            const nextFormIndex = 1;
            nextSection = NyphSurveyForm.sections[nextFormIndex];

            const nextButton = buttonContainer.appendChild(document.createElement('button'));
            nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
            nextButton.type = 'button';
            nextButton.textContent = 'next »';
            nextButton.setAttribute('data-buttonaction', 'next');
            nextButton.title = nextSection.sectionTitle;
        }

        buttonContainer.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            const buttonEl = event.target.closest('button');

            if (buttonEl && buttonEl.hasAttribute('data-buttonaction')) {
                switch (buttonEl.getAttribute('data-buttonaction')) {
                    case 'new':
                        this.fireEvent(MainController.EVENT_NEW_RECORD);
                        break;

                    case 'back':
                        this.controller.app.router.navigate('/list/record/');
                        break;

                    case 'finish':
                        this.controller.app.router.navigate('/list/record/');
                        // display the finish dialogue box
                        $(`#${FINISH_MODAL_ID}`).modal();

                        // it's opportune at this point to try to ping the server again to save anything left outstanding
                        this.controller.app.syncAll();
                        break;

                    case 'next':
                        this.controller.app.router.navigate(`/list/survey/${nextSection.sectionNavigationKey}`);
                        break;

                    default:
                        throw new Error(`Unrecognised button action ${buttonEl.getAttribute('data-buttonaction')}`);
                }
            }
        });
    }

    /**
     *
     * @param {Occurrence} occurrence
     * @returns {boolean}
     */
    occurrenceIsMostRecent(occurrence) {
        // loop through entries sorted by creation date, most recent first
        for (let occurrenceTuple of this.controller.occurrences.entries()) {
            if (occurrenceTuple[1].createdStamp > occurrence.createdStamp && !occurrenceTuple[1].deleted) {
                return false;
            }
        }
        return true;
    }

    /**
     *
     * @param {string} [htmlText]
     */
    #displayDefaultRightPanel(htmlText) {
        let rightPanelContainer = document.getElementById(RIGHT_PANEL_ID);
        rightPanelContainer.innerHTML = htmlText || defaultRightHandSideHelp;

        rightPanelContainer.scrollTop = 0;

        this.controller.app.router.updatePageLinks(); // required in case help text contains any Navigo links
    }

    #clearOccurrenceListeners() {
        for(let id in this.#occurrenceChangeHandles) {
            let occurrence = this.controller.occurrences.get[id];
            if (occurrence) {
                occurrence.removeListener(Occurrence.EVENT_MODIFIED, this.#occurrenceChangeHandles[id]);
            }
        }

        this.#occurrenceChangeHandles = {};
    }

    static NEXT_RECORDS = 'records';
    static NEXT_SURVEY_SECTION = 'survey';
    static NEXT_IS_FINAL = 'last';

    /**
     * sets up the accordion list of welcome text, survey form and occurrence sections
     */
    #populateLeftPanel() {
        const leftPanel = document.getElementById(LEFT_PANEL_ID);
        const accordionEl = leftPanel.appendChild(document.createElement('div'));
        accordionEl.className = "accordion";
        this.leftPanelAccordionId = accordionEl.id = Form.nextId;

        this.#appendWelcomeSection();
        this.#appendSurveyForm(0, accordionEl, MainView.NEXT_SURVEY_SECTION); // about you
        this.#appendSurveyForm(1, accordionEl, MainView.NEXT_RECORDS); // about your survey
        this.#appendOccurrenceListContainer();

        // Keep this as is useful as guide for building other app layouts
        // this.#appendSurveyForm(1, accordionEl, MainView.NEXT_IS_FINAL); // about your garden

        this.#buildOccurrenceList();

        /**
         * need to manually intercept clicks on the form help buttons
         * to prevent click also triggering an accordion toggle
         */
        accordionEl.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            const targetLinkEl = event.target.closest('a');

            if (targetLinkEl && targetLinkEl.hasAttribute('data-help-link')) {
                event.preventDefault();
                event.stopPropagation();

                this.controller.app.router.navigate(targetLinkEl.getAttribute('data-help-link'));
            }
        });

        this.#registerLeftPanelAccordionEvent();
        this.#registerModals();
    }

    #registerModals() {
        //const container = document.getElementById(LEFT_PANEL_ID);
        const container = document.body;

        // Delete record modal
        const deleteOccurrenceModalHTML = `<div class="modal fade" id="${DELETE_OCCURRENCE_MODAL_ID}" tabindex="-1" role="dialog" aria-labelledby="${DELETE_OCCURRENCE_MODAL_ID}Title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${DELETE_OCCURRENCE_MODAL_ID}Title">Delete record?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Please confirm that you wish to delete the record.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" id="${DELETE_OCCURRENCE_MODAL_ID}confirmed">Delete record</button>
      </div>
    </div>
  </div>
</div>`;

        const deleteOccurrenceModalEl = document.createElement('div');
        deleteOccurrenceModalEl.innerHTML = deleteOccurrenceModalHTML;

        container.appendChild(deleteOccurrenceModalEl.firstChild);

        $(`#${DELETE_OCCURRENCE_MODAL_ID}`).on('show.bs.modal', (event) => {
            const button = $(event.relatedTarget); // Button that triggered the modal

            // button will not be valid if modal has been invoked directly from script,
            // in which case the occurrence id attribute will already have been set
            if (button && button.data('occurrenceid')) {
                const occurrenceId = button.data('occurrenceid');
                document.getElementById(`${DELETE_OCCURRENCE_MODAL_ID}confirmed`).setAttribute('data-occurrenceid', occurrenceId);
            }
        });

        document.getElementById(`${DELETE_OCCURRENCE_MODAL_ID}confirmed`).addEventListener('click', /** @param {MouseEvent} event */ (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            const confirmButtonEl = event.target.closest('button');

            if (confirmButtonEl && confirmButtonEl.hasAttribute('data-occurrenceid')) {
                const occurrenceId = confirmButtonEl.getAttribute('data-occurrenceid');
                console.log(`Deleting occurrence ${occurrenceId}.`);

                this.fireEvent(MainController.EVENT_DELETE_OCCURRENCE, {occurrenceId});
            }
        });


        // 'finish' modal
        // this pop-up is informational only
        const finishModalEl = document.createElement('div');
        finishModalEl.innerHTML = `<div class="modal fade" id="${FINISH_MODAL_ID}" tabindex="-1" role="dialog" aria-labelledby="${FINISH_MODAL_ID}Title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="${FINISH_MODAL_ID}Title">Thank you</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Thank you! Your records have been sent. If you wish, you can continue to make changes and edit or add further records.</p>
        <p>We will email you a link to this form, so that you can return to it later if needed.</p>
        <p>If you are planning another Plant Hunt expedition then please start a new survey, using the 'Survey' menu<.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

        container.appendChild(finishModalEl.firstChild);

        container.appendChild(ImageField.licenseModal());

        // image modal
        // includes a button to delete the image
        const imageModalEl = document.createElement('div');
        imageModalEl.innerHTML = `<div class="modal fade" id="${IMAGE_MODAL_ID}" tabindex="-1" role="dialog" aria-labelledby="${IMAGE_MODAL_ID}Title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header d-none d-md-flex">
        <h5 class="modal-title" id="${IMAGE_MODAL_ID}Title">Photo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="position: relative;">
        <picture>
        </picture>
      </div>
      <div class="modal-footer">
        <button type="button" id="${IMAGE_MODAL_DELETE_BUTTON_ID}" class="btn btn-outline-danger delete-occurrence-button mr-3" data-toggle="modal" data-target="#${DELETE_IMAGE_MODAL_ID}" data-imageid=""><i class="material-icons">delete</i></button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;
        container.appendChild(imageModalEl.firstChild);

        document.getElementById(IMAGE_MODAL_DELETE_BUTTON_ID).addEventListener('click',/** @param {MouseEvent} event */ (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            const deleteButtonEl = event.target.closest('button');

            if (deleteButtonEl && deleteButtonEl.hasAttribute('data-imageid')) {
                const imageId = deleteButtonEl.getAttribute('data-imageid');
                //console.log(`Deleting image ${occurrenceId}.`);

                this.#occurrenceForm.fireEvent(EVENT_DELETE_IMAGE, {imageId});
                $(`#${IMAGE_MODAL_ID}`).modal('hide');
            }
        });
    }

    #registerLeftPanelAccordionEvent() {
        // console.log('Registering left panel accordion event handler.');

        $(`#${LEFT_PANEL_ID}`).on('show.bs.collapse', (event) => {
            // this will fire for both selection events within the records list and for changes to the top-level accordion

            console.log({'left panel show.bs.collapse' : event});

            if (event.target.dataset.occurrenceid) {
                console.log({'left panel accordion show event (with occ id)' : event});
                this.fireEvent(MainController.EVENT_SELECT_OCCURRENCE, {occurrenceId: event.target.dataset.occurrenceid});
            } else if (event.target.dataset.sectionkey) {
                console.log({'left panel accordion show event (with section key)' : event});
                this.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {sectionKey: event.target.dataset.sectionkey});
            } else {
                console.log({'left panel accordion show event (other)' : event});
            }
        }).on('hide.bs.collapse', (event) => {
            console.log({'left panel hide.bs.collapse' : event});

            if (event.target.dataset.sectionkey && this.#surveyFormSections[event.target.dataset.sectionkey]) {
                const isValid = this.#surveyFormSections[event.target.dataset.sectionkey].validateForm();
                console.log({'survey section validity': isValid});

                if (!isValid) {
                    event.preventDefault();
                }
            }
        }).on('hidden.bs.collapse', (event) => {
            // this will fire for both selection events within the records list and for changes to the top-level accordion

            console.log({'left panel accordion hidden event' : event});

            if (event.target.dataset.occurrenceid) {
                // should evaluate the validity of the individual occurrence

                const occurrence = this.controller.occurrences.get(event.target.dataset.occurrenceid);

                if (occurrence.isNew && !occurrence.isPristine) {
                    // closing of the slider is an action suggesting that user has moved on and validation should start
                    occurrence.isNew = false;
                    this.refreshOccurrenceValiditySummary(occurrence);
                }

                // only trigger a navigation if the occurrence was the current one
                if (this.controller.currentOccurrenceId === event.target.dataset.occurrenceid) {
                    this.fireEvent(MainController.EVENT_SELECT_OCCURRENCE, {occurrenceId: ''});
                }
            } else if (event.target.dataset.sectionkey) {
                if (event.target.dataset.sectionkey === 'record') {
                    // closing the top-level occurrences list
                    // need to propagate validation down to the occurrences

                    // only trigger a navigation if the view context was the current one
                    if (this.controller.viewSubcontext === 'record') {
                        this.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {sectionKey: ''});
                    }
                } else {
                    if (this.#surveyFormSections[event.target.dataset.sectionkey]) {
                        const isValid = this.#surveyFormSections[event.target.dataset.sectionkey].validateForm();
                        console.log({'survey section validity': isValid});

                        // only trigger a navigation if the section was the current one
                        if (this.controller.surveySection === event.target.dataset.sectionkey) {
                            this.fireEvent(MainController.EVENT_SELECT_SURVEY_SECTION, {sectionKey: ''});
                        }
                    }
                }
            }
        });
    }

    /**
     *
     * @param {HTMLButtonElement} nextButton
     * @param {HTMLAnchorElement} newButton
     * @param {HTMLElement} container
     * @private
     */
    _reviseWelcomeButtons(nextButton, newButton, container) {
        //container.className = 'welcome-container';

        //let numberOfSurveys = this.controller.app.surveys.size;
        if (this.controller.app.currentSurvey && this.controller.app.currentSurvey && this.controller.app.currentSurvey.place) {
            nextButton.textContent = `continue '${this.controller.app.currentSurvey.generateSurveyName()}' »`;
            newButton.style.display = 'inline';
        } else {
            nextButton.textContent = 'get started »';
            newButton.style.display = 'none';
        }
    }

    #appendWelcomeSection() {
        const accordionEl = document.getElementById(this.leftPanelAccordionId);

        // add 'next' button to the bottom of the survey form
        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary';
        nextButton.type = 'button';
        nextButton.textContent = 'get started »';
        nextButton.setAttribute('data-toggle', 'collapse');
        nextButton.setAttribute('data-target', '#survey-0-about');

        const newSurveyButton = document.createElement('a');
        newSurveyButton.className = 'btn';
        newSurveyButton.type = 'button';
        newSurveyButton.href = `/${this.pathPrefix}/survey/new`;
        newSurveyButton.dataset.navigo = 'survey/new';
        newSurveyButton.textContent = 'start new list »';
        newSurveyButton.style.display = 'none';

        let cardId = Form.nextId;

        const sectionElement = document.createElement('div');
        sectionElement.innerHTML = welcomeContent;

        this._reviseWelcomeButtons(nextButton, newSurveyButton, sectionElement);

        this.controller.app.addListener(App.EVENT_SURVEYS_CHANGED, () => {
            this._reviseWelcomeButtons(nextButton, newSurveyButton, sectionElement);
        });

        sectionElement.appendChild(nextButton);
        sectionElement.appendChild(newSurveyButton);

        const helpLink = document.createElement('span');
        helpLink.className = 'd-md-none pl-2';
        // noinspection HtmlUnknownTarget
        helpLink.innerHTML = `(<a href="/${this.pathPrefix}/list/survey/welcome/help" data-navigo="list/survey/welcome/help">more info</a>)`;
        sectionElement.appendChild(helpLink);

        accordionEl.appendChild(this.card({
            cardId: cardId,
            cardHeadingId: Form.nextId,
            collapsed: this.controller.surveySection !== 'welcome',
            headingButtonId: Form.nextId,
            headingHTML: 'Welcome',
            headingNonbuttonHTML: '', // `<small class="btn d-md-none">(<a href="/app/list/survey/${sectionClass.sectionNavigationKey}/help" data-help-link="/list/survey/${sectionClass.sectionNavigationKey}/help">help</a>)</small>`,
            headingValidationWarningHTML: '',
            cardDescriptionId: `survey-welcome`,// Form.nextId,
            parentContainerId: accordionEl.id,
            bodyContentElement: sectionElement,
            dataAttributes : {sectionkey : "welcome"}
        }));
    }

    /**
     *
     * @param {number} formIndex
     * @param {HTMLElement} accordionEl
     * @param {'records','survey','last'} next
     */
    #appendSurveyForm(formIndex, accordionEl, next) {
        const sectionClass = NyphSurveyForm.sections[formIndex];

        const surveyFormSection = new NyphSurveyForm(sectionClass);

        this.#surveyFormSections[sectionClass.sectionNavigationKey] = surveyFormSection;

        let formElement = surveyFormSection.formElement;

        // add 'next' button to the bottom of the survey form
        let nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary';
        nextButton.type = 'button';
        nextButton.textContent = 'next »';

        surveyFormSection.nextButtonId = nextButton.id = Form.nextId;

        switch (next) {
            case MainView.NEXT_RECORDS:
                // records section is next
                // if there are no records then clicking the button should add a new one automatically
                // the complexity of this dual action requires a click handler

                nextButton.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
                    if (!doubleClickIntercepted(event)) {
                        event.preventDefault();
                        event.stopPropagation();

                        surveyFormSection.liveValidation = true;

                        if (surveyFormSection.validateForm()) {
                            this.fireEvent(MainController.EVENT_NEXT_TO_RECORDS);
                        }
                    }
                });
                break;

            case MainView.NEXT_SURVEY_SECTION:
                // there's another survey section
                const nextSection = NyphSurveyForm.sections[formIndex + 1];

                nextButton.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
                    if (!doubleClickIntercepted(event)) {
                        console.log({'in MainView.NEXT_SURVEY_SECTION liveValidation' : surveyFormSection.liveValidation});
                        console.log({surveyFormSection});

                        surveyFormSection.liveValidation = true;

                        if (!surveyFormSection.validateForm()) {
                            // if not valid then prevent the event

                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                });

                nextButton.setAttribute('data-toggle', 'collapse');
                nextButton.setAttribute('data-target', `#survey-${formIndex + 1}-${nextSection.sectionNavigationKey}`);
                nextButton.title = nextSection.sectionTitle;
                break;

            case MainView.NEXT_IS_FINAL:
                nextButton.textContent = 'finish';
                nextButton.className = 'btn btn-primary btn-md-lg mt-2 mb-3';
                nextButton.type = 'button';

                nextButton.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
                    if (!doubleClickIntercepted(event)) {
                        this.controller.app.router.navigate('/list/');
                        // display the finish dialogue box
                        $(`#${FINISH_MODAL_ID}`).modal();
                    }
                });
                break;

            default:
                throw new Error(`Unrecognized next section keyword '${next}'`);
        }

        formElement.appendChild(nextButton);

        let cardId = Form.nextId;

        //surveyFormSection.cardId = cardId; // need to register this so that subsequent cards can be hidden completely while earlier sections are invalid

        accordionEl.appendChild(this.card({
            cardId: cardId,
            cardHeadingId: Form.nextId,
            collapsed: this.controller.surveySection !== sectionClass.sectionNavigationKey,
            headingButtonId: Form.nextId,
            headingHTML: sectionClass.sectionTitle,
            headingNonbuttonHTML: `<small class="btn d-md-none" style="margin: 0; padding: 0;">(<a href="/${this.pathPrefix}/list/survey/${sectionClass.sectionNavigationKey}/help" data-help-link="/list/survey/${sectionClass.sectionNavigationKey}/help">help</a>)</small>`,
            headingValidationWarningHTML: 'Please check the form for some missing responses.',
            cardDescriptionId: `survey-${formIndex}-${sectionClass.sectionNavigationKey}`,// Form.nextId,
            parentContainerId: accordionEl.id,
            bodyContentElement: formElement,
            dataAttributes : {sectionkey : sectionClass.sectionNavigationKey}
        }));

        // cannot call registerForm until the form is part of the document
        this.controller.survey.registerForm(surveyFormSection);

        surveyFormSection.addListener(Form.EVENT_VALIDATION_STATE_CHANGE, (params) => {
            const cardEl = document.getElementById(cardId);
            if (params.isValid) {
                cardEl.classList.remove('is-invalid');
            } else {
                cardEl.classList.add('is-invalid');
            }

            //if (surveyFormSection.sectionCompletionRequired()) {
                /**
                 * @type {HTMLButtonElement}
                 */
                //let nextButton = document.getElementById(surveyFormSection.nextButtonId);
                //nextButton.disabled = !params.isValid;
            //}

            this._refreshVisibilityOfAccordionSections();
        });

        surveyFormSection.testRequiredComplete(); // will trigger event if required sections are incomplete
    }

    _refreshVisibilityOfAccordionSections() {
        //const accordionEl = document.getElementById(this.leftPanelAccordionId);

        const accordionSections = document.querySelectorAll(`div#${this.leftPanelAccordionId} > div`);

        let valid = true;
        for (let cardEl of accordionSections) {
            if (valid) {
                cardEl.classList.remove('hidden-card');
            } else {
                cardEl.classList.add('hidden-card');
            }

            if (cardEl.classList.contains('is-invalid')) {
                valid = false; // subsequent entries should be hidden
            }
        }
    }

    #appendOccurrenceListContainer() {
        const accordionEl = document.getElementById(this.leftPanelAccordionId);

        const content = document.createDocumentFragment();
        const summaryEl = content.appendChild(document.createElement('p'));

        this.recordsHeaderListDescriptorId = Form.nextId;

        let separateListsHTMLMessage;

        // include a warning here if the date has changed - prompting for new list
        if (this.controller.survey.date < DateField.todaysDate()) {
            separateListsHTMLMessage = `<p>A survey can last for up to 3 hours on a single day from a single local area. You can send in as many separate lists as you like.</p><p><strong>The current survey is from ${this.controller.survey.date}, please <a href="/${this.pathPrefix}/survey/new" data-navigo="survey/new">start a new list</a> if you are now adding records for a different day.</strong></p>`;
        } else {
            separateListsHTMLMessage = `<p>Please survey for up to 3 hours on a single day. If your start again in a new area or on a different day, then please <a href="/${this.pathPrefix}/survey/new" data-navigo="survey/new">start another separate list</a>.</p>`;
        }

        // noinspection HtmlUnknownTarget
        summaryEl.innerHTML = `<span id="${this.recordsHeaderListDescriptorId}"><strong>Records of plants in bloom from ${this.controller.survey.generateSurveyName()}.</strong></span><small class="d-block d-md-none"><a href="/${this.pathPrefix}/list/record/help">(help)</a></small>${separateListsHTMLMessage}`;

        const newButtonEl = content.appendChild(document.createElement('button'));
        newButtonEl.type = 'button';
        newButtonEl.className = 'btn btn-primary btn-lg mb-2';
        newButtonEl.innerText = 'Add a plant record.';

        newButtonEl.addEventListener('click', this.newButtonClickHandler.bind(this));

        const recordListContainer = content.appendChild(document.createElement('div'));
        recordListContainer.id = OCCURRENCE_LIST_CONTAINER_ID;

        this.controller.survey.addListener(Survey.EVENT_MODIFIED, () => {
            const occurrenceHeadingEl = document.getElementById(this.recordsHeaderListDescriptorId);

            if (occurrenceHeadingEl) {
                occurrenceHeadingEl.innerHTML = `<strong>Records of plants in bloom from ${this.controller.survey.generateSurveyName()}.</strong>`;
            }
        });

        let cardId = Form.nextId;

        accordionEl.appendChild(this.card({
            cardId: cardId,
            cardHeadingId: Form.nextId,
            collapsed: this.controller.viewSubcontext !== 'record',
            headingButtonId: Form.nextId,
            headingHTML: 'Your plant records',
            cardDescriptionId: Form.nextId,
            parentContainerId: accordionEl.id,
            bodyContentElement: content,
            dataAttributes : {sectionkey : 'record'}
        }));

        this.controller.app.router.updatePageLinks();

        this._refreshVisibilityOfAccordionSections(); // this section was added last, need to ensure that it also reflects the state of accordion section hiding
    }

    /**
     * @param {MouseEvent} event
     */
    newButtonClickHandler(event) {
        if (doubleClickIntercepted(event)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        this.fireEvent(MainController.EVENT_NEW_RECORD);
    }

    #getOccurrenceListContainer() {
        const listContainer = document.getElementById(OCCURRENCE_LIST_CONTAINER_ID);
        if (!listContainer) {
            throw new InternalAppError("Failed to find list container.");
        }

        return listContainer;
    }

    /**
     *
     */
    #buildOccurrenceList() {
        const listContainer = this.#getOccurrenceListContainer();

        this.#clearOccurrenceListeners();

        const occurrencesHtml = [];

        // loop through entries sorted by creation date, most recent first
        for (let occurrenceTuple of [...this.controller.occurrences.entries()].sort((a, b) => b[1].createdStamp - a[1].createdStamp)) {
            let occurrence = occurrenceTuple[1];

            if (!occurrence.deleted) {
                const valid = occurrence.isNew || occurrence.evaluateCompletionStatus(NyphOccurrenceForm.properties).requiredFieldsPresent;

                occurrencesHtml.push(
`<div class="card${valid ? '' : ' is-invalid'}" id="card_${occurrence.id}">
    ${this.#occurrenceSummaryHTML(occurrence)}
</div>`);

                this.#occurrenceChangeHandles[occurrence.id] = occurrence.addListener(
                    Occurrence.EVENT_MODIFIED,
                    this.occurrenceChangeHandler.bind(this),
                    {occurrenceId: occurrence.id}
                );
            }
        }

        let nullListInputId = `nullList${Form.nextId}`;


        const checked = this.controller.app.currentSurvey.attributes['nulllist'] ? ' checked' : '';

        // this will be hidden by css if the list is not empty
        const nullListMessage =
            `<div class="nyph-null-list-prompt"><p>Very occasionally people encounter no plants in bloom during their survey.
These 'null lists' are still useful to us, so please tell us even if you recorded no plants in flower.</p>
<p><label><input type="checkbox" value="1" name="nulllist" id="${nullListInputId}"${checked}> This is a null list (I saw no plants in flower during my walk).</label></div></p>`;

        occurrencesHtml.push(nullListMessage);

        listContainer.className = 'accordion';
        listContainer.innerHTML = occurrencesHtml.join('');

        /**
         * need to manually intercept clicks on the delete occurrence button
         * to prevent click also triggering an accordion toggle
         */
        listContainer.addEventListener('click', /** @param {MouseEvent} event */ (event) => {
            if (doubleClickIntercepted(event)) {
                return;
            }

            const targetButtonEl = event.target.closest('button');

            if (targetButtonEl && targetButtonEl.hasAttribute('data-toggle') && targetButtonEl.getAttribute('data-toggle') === 'modal') {
                // annotate the delete record modal dialogue box with the occurrence id
                document.getElementById(`${DELETE_OCCURRENCE_MODAL_ID}confirmed`)
                    .setAttribute('data-occurrenceid', targetButtonEl.getAttribute('data-occurrenceid'));

                // display the dialogue box
                $(targetButtonEl.getAttribute('data-target')).modal();

                event.preventDefault();
                event.stopPropagation();
            }
        });

        /**
         *
         * @type {HTMLInputElement}
         */
        const nullListToggleEl = document.getElementById(nullListInputId);

        if (nullListToggleEl) {
            nullListToggleEl.addEventListener('change', /** @param {MouseEvent} event */ (event) => {
                if (doubleClickIntercepted(event)) {
                    return;
                }

                console.log({'Updating null list state' : nullListToggleEl.checked});

                this.controller.app.currentSurvey.setAttribute('nulllist', nullListToggleEl.checked);

                //this.fireEvent(MainView.EVENT_NULL_LIST_CHANGE, {'isNull' : nullListToggleEl.checked});
            });
        }

        this.testForEmptyList(); // sets a class on the occurrence list container
    }

    /**
     * called after the one-off addition of a new occurrence
     *
     * @param {{occurrenceId: string, surveyId: string}} params
     */
    occurrenceAddedHandler(params) {
        const occurrenceList = this.#getOccurrenceListContainer();

        if (occurrenceList) {
            const occurrence = this.controller.occurrences.get(params.occurrenceId);
            const itemCard = document.createElement('div');
            itemCard.className = 'card';
            itemCard.id = `card_${occurrence.id}`;
            itemCard.innerHTML = this.#occurrenceSummaryHTML(occurrence);

            this.#occurrenceChangeHandles[occurrence.id] = occurrence.addListener(
                Occurrence.EVENT_MODIFIED,
                this.occurrenceChangeHandler.bind(this),
                {occurrenceId: occurrence.id}
            );

            occurrenceList.insertBefore(itemCard, occurrenceList.firstChild);

            occurrenceList.classList.add('has-occurrences');
        }
    }

    /**
     * sets validity flag in occurrence accordion header
     *
     * @param {Occurrence} occurrence
     */
    refreshOccurrenceValiditySummary(occurrence) {
        const cardEl = document.getElementById(`card_${occurrence.id}`);
        if (cardEl) {
            const validity = occurrence.evaluateCompletionStatus(NyphOccurrenceForm.properties);

            if (validity.requiredFieldsPresent) {
                cardEl.classList.remove('is-invalid');
            } else {
                cardEl.classList.add('is-invalid');
            }
        }
    }

    /**
     *
     * @param {{occurrenceId : string}} params
     */
    occurrenceChangeHandler(params) {
        const occurrence = this.controller.occurrences.get(params.occurrenceId);
        const el = document.getElementById(`card_${params.occurrenceId}`);

        if (el) {
            if (!occurrence.deleted) {
                el.innerHTML = this.#occurrenceSummaryHTML(occurrence);
                this.refreshOccurrenceValiditySummary(occurrence);
            } else {
                el.parentElement.removeChild(el);

                // remove the event listener
                if (this.#occurrenceChangeHandles[params.occurrenceId]) {
                    occurrence.removeListener(Occurrence.EVENT_MODIFIED, this.#occurrenceChangeHandles[params.occurrenceId]);
                    this.#occurrenceChangeHandles[params.occurrenceId] = null;
                }
            }
        }

        this.testForEmptyList()
    }

    testForEmptyList() {
        let haveOccurrences = false;
        for (let occurrenceTuple of [...this.controller.occurrences.entries()]) {
            let occurrence = occurrenceTuple[1];

            if (!occurrence.deleted) {
                haveOccurrences = true;
            }
        }

        const listContainer = this.#getOccurrenceListContainer();

        if (haveOccurrences) {
            listContainer.classList.add('has-occurrences');
        } else {
            listContainer.classList.remove('has-occurrences');
        }
    }

    /**
     *
     * @param {Occurrence} occurrence
     * @returns {string}
     */
    occurrenceSummaryBodyHTML(occurrence) {
        let html = '';

        for (let key in occurrence.attributes) {
            if (occurrence.attributes.hasOwnProperty(key)
                && NyphOccurrenceForm.properties.hasOwnProperty(key)
                && !NyphOccurrenceForm.properties[key].field.isEmpty(occurrence.attributes[key])
            ) {
                let summaryHTML = NyphOccurrenceForm.properties[key].field.summarise(key, NyphOccurrenceForm.properties[key], occurrence.attributes);

                if (summaryHTML) {
                    html += `<p class="ellipsed-line mb-0">${summaryHTML}</p>`;
                }
            }
        }

        if (NyphApp.devMode) {
            html += `<p class="mb-0">(<i>id ${occurrence.id}</i>)</p>`;
        }
        return html;
    }

    /**
     *
     * @param {Occurrence} occurrence
     * @returns {string}
     */
    occurrenceSummaryHeadingHTML(occurrence) {
        let html = '';

        if (occurrence.attributes.hasOwnProperty('images') && occurrence.attributes.images.length) {
            const firstImageId = occurrence.attributes.images[0];
            html += OccurrenceImage.imageLink(firstImageId, 48, 48, {className : 'mr-1'});
        }

        if (occurrence.attributes.taxon && occurrence.attributes.taxon.taxonId) {
            // have a well-formed taxon
            html += occurrence.taxon.formattedHTML(occurrence.attributes.taxon.vernacularMatch);
        } else if (occurrence.attributes.taxon && occurrence.attributes.taxon.taxonName) {
            // match with unrecognised taxon name
            html += escapeHTML(occurrence.attributes.taxon.taxonName);
        } else {
            html += '<span>(unnamed plant)</span>';
        }

        return html;
    }

    /**
     *
     *
     * @param {Occurrence} occurrence
     * @return {string}
     */
    #occurrenceSummaryHTML (occurrence) {
        let unsavedMessage = (!occurrence.isPristine && occurrence.unsaved()) ?
            '<span class="occurrence-unsaved-warning">Not yet saved.</span>'
            :
            ''

        return `<div class="card-header pointer pl-2 pr-2 pt-2 pb-2" id="heading_${occurrence.id}" data-toggle="collapse" data-target="#description_${occurrence.id}">
    <div class="float-right">
        <button type="button" class="btn btn-outline-danger delete-occurrence-button" data-toggle="modal" data-target="#${DELETE_OCCURRENCE_MODAL_ID}" data-occurrenceid="${occurrence.id}"><i class="material-icons">delete</i></button>
    </div>
    <h2 class="mb-0 pb-0 mt-0 pt-0 pl-0 ml-0">
        <button class="btn btn-link${(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed')} pt-0 pb-0 pl-0" id="headingbutton_${occurrence.id}" type="button" data-toggle="collapse" data-target="#description_${occurrence.id}" aria-expanded="${(this.controller.currentOccurrenceId === occurrence.id ? 'true' : 'false')}" aria-controls="description_${occurrence.id}">
          ${this.occurrenceSummaryHeadingHTML(occurrence)}
        </button>
    </h2>
    <div class="card-invalid-feedback">
        <small>Please check for errors or missing details.</small>
    </div>${unsavedMessage}
</div>
<div id="description_${occurrence.id}" class="collapse${(this.controller.currentOccurrenceId === occurrence.id ? ' show' : '')}" aria-labelledby="heading_${occurrence.id}" data-parent="#${OCCURRENCE_LIST_CONTAINER_ID}" data-occurrenceid="${occurrence.id}">
  <div class="card-body">
    ${this.occurrenceSummaryBodyHTML(occurrence)}
  </div>
</div>`;
    }

    /**
     *
     * @param {('left'|'right')} panel
     */
    setResponsivePanel(panel) {
        const rightPanel = document.getElementById(RIGHT_PANEL_ID);
        const leftPanel = document.getElementById(LEFT_PANEL_ID);
        const midPanel = document.getElementById(CONTROL_PANEL_ID);

        switch (panel) {
            case PANEL_LEFT:
                leftPanel.classList.remove('d-none');
                leftPanel.classList.add('d-block');
                rightPanel.classList.remove('d-block');
                rightPanel.classList.add('d-none');
                midPanel.classList.remove('d-md-none');
                midPanel.classList.add('d-none');
                break;

            case PANEL_RIGHT:
                if (leftPanel.classList.contains('d-block')) {
                    leftPanel.classList.remove('d-block');

                    console.log('scrolling to top in setResponsivePanel');
                    rightPanel.scrollTop = 0;
                }

                leftPanel.classList.add('d-none');
                rightPanel.classList.remove('d-none');
                rightPanel.classList.add('d-block');
                midPanel.classList.remove('d-none');
                midPanel.classList.add('d-md-none');
                break;

            default:
                throw new Error(`Unrecognised panel value '${panel}`);
        }
    }
}
