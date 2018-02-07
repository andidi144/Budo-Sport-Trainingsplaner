import { Injectable }    from '@angular/core';

export type Toast = {text: string, style: string};

@Injectable()
export class ToastService {

    toastArray: Toast[] = [];

    addToast(text: string, style: string): void {

        let time: number = 8;

        this.toastArray.push({text: text, style: style});
        setTimeout(() => {
            this.toastArray.splice(0, 1);
        }, time * 1000);
    }

    removeToast(index: number): void {
        this.toastArray.splice(index, 1);
    }

}