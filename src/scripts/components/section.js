class Section {
    constructor({items, renderer}, containerSelector, place) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._place = place;
    }

    renderAllItems() {
        this._items.forEach((item) => {
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