import Navigo from "navigo";

export class PatchedNavigo extends Navigo {
    updatePageLinks() {
        if (typeof document === 'undefined') {
            return;
        }

        const l = document.createElement("a");
        l.href = this.root;

        const rootPath = l.pathname;

        this._findLinks().forEach((link) => {
            if (!link.hasListenerAttached) {
                link.addEventListener('click', (e) => {
                    if ((e.ctrlKey || e.metaKey) && e.target.tagName.toLowerCase() == 'a') {
                        return false;
                    }

                    if (!this._destroyed) {
                        const path = link.pathname;
                        // console.log({path});

                        const leaf = path.replace(rootPath, '');
                        // console.log({leaf});

                        //var location = self.getLinkPath(link);

                        e.preventDefault();
                        //self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
                        this.navigate(leaf);
                    }
                });
                link.hasListenerAttached = true;
            }
        })
    }
}