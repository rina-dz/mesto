class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderAllItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addDefaultItems(element) {
        this._container.append(element);
    }

    addNewCard(card) {
        this._container.prepend(card);
    }
}

export { Section };