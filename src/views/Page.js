// Page
// Abstract super-class for page views

import {EventHarness} from "../framework/EventHarness";

export class Page extends EventHarness {

    /**
     * @type {AppController}
     */
    controller;

    /**
     * called once during late-stage app initialisation
     * (NB this may not be the current view when called)
     *
     * an opportunity to register listeners on this.controller.app
     */
    initialise() {

    }

    // /**
    //  *
    //  * @param {HTMLElement} containerEl
    //  */
    // static initialise_layout(containerEl) {
    //
    // }

    display() {
        console.log('got to view display');

        // these serve as hook points for child classes
        this.refreshHeader();
        this.body();
    }

    refreshHeader() {

    }

    body() {

    }

    /**
     *
     * @param {{}} descriptor
     * @param {string} descriptor.cardId
     * @param {string} descriptor.cardHeadingId
     * @param {boolean} descriptor.collapsed
     * @param {string} descriptor.headingButtonId
     * @param {string} descriptor.headingHTML
     * @param {string} [descriptor.headingNonbuttonHTML]
     * @param {string} descriptor.cardDescriptionId
     * @param {string} descriptor.parentContainerId
     * @param {HTMLElement} descriptor.bodyContentElement
     * @param {{string, string}} descriptor.dataAttributes
     * @param {string} descriptor.headingValidationWarningHTML
     *
     * @returns {HTMLDivElement}
     */
    card(descriptor) {
        let cardContainer = document.createElement('div');
        cardContainer.id = descriptor.cardId;
        cardContainer.className = 'card';

        let cardHeadingEl = cardContainer.appendChild(document.createElement('div'));
        cardHeadingEl.className = 'card-header pointer';
        if (descriptor.cardHeadingId) {
            cardHeadingEl.id = descriptor.cardHeadingId;
        }
        cardHeadingEl.setAttribute('data-toggle', 'collapse');
        cardHeadingEl.setAttribute('data-target', `#${descriptor.cardDescriptionId}`);


        let headingEl = cardHeadingEl.appendChild(document.createElement('h2'));
        headingEl.className = 'mb-0';

        let buttonEl = headingEl.appendChild(document.createElement('button'));
        buttonEl.className = `btn btn-link${(descriptor.collapsed ? ' collapsed' : '')}`;

        if (descriptor.headingButtonId) {
            buttonEl.id = descriptor.headingButtonId;
        }

        buttonEl.type = 'button';
        buttonEl.setAttribute('data-toggle', 'collapse');

        if (descriptor.cardDescriptionId) {
            buttonEl.setAttribute('data-target', `#${descriptor.cardDescriptionId}`);
            buttonEl.setAttribute('aria-controls', descriptor.cardDescriptionId);
        }

        buttonEl.setAttribute('aria-expanded', descriptor.collapsed ? 'false' : 'true');
        buttonEl.innerHTML = descriptor.headingHTML;

        if (descriptor.headingNonbuttonHTML) {
            const extraHeadingElement = headingEl.appendChild(document.createElement('span'));
            extraHeadingElement.style.display = 'inline-block';
            extraHeadingElement.innerHTML = descriptor.headingNonbuttonHTML;
        }

        if (descriptor.headingValidationWarningHTML) {
            const headerValidationWarning = cardHeadingEl.appendChild(document.createElement('div'));
            headerValidationWarning.className = 'card-invalid-feedback';
            headerValidationWarning.innerHTML = `<small>${descriptor.headingValidationWarningHTML}</small>`;
        }

        let cardDescriptionEl = cardContainer.appendChild(document.createElement('div'));
        if (descriptor.cardDescriptionId) {
            cardDescriptionEl.id = descriptor.cardDescriptionId;
        }
        cardDescriptionEl.className = `collapse${(descriptor.collapsed ? '' : ' show')}`;
        if (descriptor.cardHeadingId) {
            cardDescriptionEl.setAttribute('aria-labelledby', descriptor.cardHeadingId);
        }

        cardDescriptionEl.setAttribute('data-parent', `#${descriptor.parentContainerId}`);

        if (descriptor.dataAttributes) {
            for (let key in descriptor.dataAttributes) {
                if (descriptor.dataAttributes.hasOwnProperty(key)) {
                    cardDescriptionEl.setAttribute(`data-${key}`, descriptor.dataAttributes[key]);
                }
            }
        }

        let cardBodyEl = cardDescriptionEl.appendChild(document.createElement('div'));
        cardBodyEl.className = 'card-body pl-2 pr-2 pl-md-3 pr-md-3';
        cardBodyEl.appendChild(descriptor.bodyContentElement);

        return cardContainer;

    //         `<div class="card-header" id="heading_${occurrence.id}">
    //   <h2 class="mb-0">
    //     <button class="btn btn-link${(this.controller.currentOccurrenceId === occurrence.id ? '' : ' collapsed')}" id="headingbutton_${occurrence.id}" type="button" data-toggle="collapse" data-target="#description_${occurrence.id}" aria-expanded="true" aria-controls="description_${occurrence.id}">
    //       Heading for (${occurrence.id}, ${taxon.canonical})
    //     </button>
    //   </h2>
    // </div>
    //
    // <div id="description_${occurrence.id}" class="collapse${(this.controller.currentOccurrenceId === occurrence.id ? ' show' : '')}" aria-labelledby="heading_${occurrence.id}" data-parent="#occurrenceslist" data-occurrenceId="${occurrence.id}">
    //   <div class="card-body">
    //     Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    //   </div>
    // </div>`;
    }
}
