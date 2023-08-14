import { makeAutoObservable } from "mobx";


class Active {
    state_profile = "default";
    state_orders = "default";


    constructor () {
        makeAutoObservable(this);
    }

    setActiveProfile () {
        this.state_profile = "active";
    }

    setActiveOrders () {
        this.state_orders = "active";
    }
}
export default new Active();