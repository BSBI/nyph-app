/**
 *
 * @param text
 * @returns {string}
 */
export function escapeHTML(text) {
    try {
        // IE (even v 11) sometimes fails here with 'Unknown runtime error', see http://blog.rakeshpai.me/2007/02/ies-unknown-runtime-error-when-using.html
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.innerHTML.replace(/"/g, '&quot;');
    } catch (e) {
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(text));
        return pre.innerHTML.replace(/"/g, '&quot;');
    }
}