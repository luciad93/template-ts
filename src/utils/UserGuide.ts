export class UserGuide {
    private userGuideButton: HTMLElement;
    private userGuidePopup: HTMLElement;
    private closePopupButton: HTMLElement;

    constructor(userGuideButtonId: string, userGuidePopupId: string, closePopupButtonId: string) {
        this.userGuideButton = document.getElementById(userGuideButtonId)!;
        this.userGuidePopup = document.getElementById(userGuidePopupId)!;
        this.closePopupButton = document.getElementById(closePopupButtonId)!;

        this.addEventListeners();
    }

    private addEventListeners() {
        this.userGuideButton.addEventListener('click', () => this.showPopup());
        this.closePopupButton.addEventListener('click', () => this.hidePopup());
        window.addEventListener('click', (event) => {
            if (event.target === this.userGuidePopup) {
                this.hidePopup();
            }
        });
    }

    private showPopup() {
        this.userGuidePopup.classList.remove('hidden');
        this.userGuidePopup.style.display = 'block';
    }

    private hidePopup() {
        this.userGuidePopup.classList.add('hidden');
        this.userGuidePopup.style.display = 'none';
    }
}