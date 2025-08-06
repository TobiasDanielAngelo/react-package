import { computed } from "mobx";
import { _async, _await, model, Model, modelAction, modelFlow, prop, } from "mobx-keystone";
import Swal from "sweetalert2";
import { deleteItemRequest, fetchItemsRequest, postItemRequest, updateItemRequest, } from ".";
export function MyModel(slug, props, derivedProps = () => ({})) {
    const Base = Model(props);
    // @ts-expect-error mobx-keystone decorator returns new class
    @model(`myApp/${slug}`)
    class GenericModel extends Base {
        update(details) {
            Object.assign(this, details);
        }
        get $() {
            return this;
        }
        get $view() {
            return {
                ...this.$,
                ...derivedProps(this),
            };
        }
    }
    return GenericModel;
}
export function MyStore(ModelClass, baseURL, slug, resetOnFetch) {
    const props = {
        items: prop(() => []),
        related: prop(() => []),
        relatedFields: prop(() => []),
        optionFields: prop(() => []),
        dateFields: prop(() => []),
        datetimeFields: prop(() => []),
        priceFields: prop(() => []),
        timeFields: prop(() => []),
        isSubscribed: prop(false),
        lastUpdated: prop(""),
        latestParam: prop(""),
        countToUpdate: prop(0),
    };
    @model(`myApp/${slug}Store`)
    class GenericStore extends Model(props) {
        onInit() {
            super.onInit();
        }
        onAttachedToRootStore() { }
        @computed
        get allItems() {
            const map = new Map();
            this.items.forEach((item) => map.set(item.id ?? -1, item));
            return map;
        }
        @computed
        get itemsSignature() {
            function computeItemsSignature(ModelClass, items) {
                const keys = Object.keys(new ModelClass({}).$view);
                return items
                    .map((item) => keys.map((key) => String(item.$view[key])).join("|"))
                    .join("::");
            }
            return computeItemsSignature(ModelClass, this.items);
        }
        @modelAction
        setSubscription = function (state) {
            this.isSubscribed = state;
        };
        @modelFlow
        fetchAll = _async(function* (params) {
            let result;
            try {
                result = yield* _await(fetchItemsRequest(baseURL, slug, params));
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Network Error",
                });
                return {
                    details: "Network Error",
                    ok: false,
                    data: null,
                    pageDetails: null,
                };
            }
            if (!result.ok || !result.data) {
                Swal.fire({
                    icon: "error",
                    title: "An error has occurred.",
                });
                return {
                    details: result.details,
                    ok: false,
                    data: null,
                    pageDetails: null,
                };
            }
            resetOnFetch && this.resetItems();
            result.related?.forEach((s) => {
                const existingRelated = this.related.find((t) => t.field === s.field && t.id === s.id);
                if (!existingRelated) {
                    this.related.push(s);
                }
                else {
                    existingRelated.name = s.name;
                }
            });
            this.dateFields = result.dateFields;
            this.datetimeFields = result.datetimeFields;
            this.timeFields = result.timeFields;
            this.priceFields = result.priceFields;
            this.relatedFields = result.relatedFields;
            this.optionFields = result.optionFields;
            result.data.forEach((s) => {
                if (!s.id)
                    return;
                if (!this.items.map((i) => i.$view.id).includes(s.id)) {
                    this.items.push(new ModelClass(s));
                }
                else {
                    this.items.find((t) => t.$view.id === s.id)?.update(s);
                }
            });
            this.lastUpdated = new Date().toISOString();
            this.latestParam = params ?? "";
            return result;
        });
        @modelFlow
        checkUpdated = _async(function* (lastUpdated) {
            let result;
            try {
                result = yield* _await(fetchItemsRequest(slug, `check_last_updated=1&last_updated=${lastUpdated}`));
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Network Error",
                });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok) {
                Swal.fire({
                    icon: "error",
                    title: "An error has occurred.",
                });
                return { details: result.details, ok: false, data: null };
            }
            this.countToUpdate = result.pageDetails?.count ?? 0;
        });
        @modelFlow
        fetchUpdated = _async(function* () {
            return yield* _await(this.fetchAll(this.latestParam));
        });
        @modelFlow
        addItem = _async(function* (details) {
            let result;
            try {
                result = yield* _await(postItemRequest(baseURL, slug, details));
            }
            catch {
                Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({ icon: "error", title: "An error has occurred." });
                return { details: result.details, ok: false, data: null };
            }
            const item = new ModelClass(result.data);
            this.items.push(item);
            return { details: "", ok: true, data: item };
        });
        @modelFlow
        updateItem = _async(function* (itemId, details) {
            let result;
            try {
                result = yield* _await(updateItemRequest(baseURL, slug, itemId, details));
            }
            catch {
                Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                // Swal.fire({ icon: "error", title: "An error has occurred." });
                return { details: result.details, ok: false, data: null };
            }
            this.items
                .find((t) => t.$view.id === (result.data?.id ?? -1))
                ?.update(result.data);
            return { details: "", ok: true, data: result.data };
        });
        @modelFlow
        deleteItem = _async(function* (itemId) {
            let result;
            try {
                result = yield* _await(deleteItemRequest(baseURL, slug, itemId));
            }
            catch {
                Swal.fire({ icon: "error", title: "Network Error" });
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok) {
                return result;
            }
            const index = this.items.findIndex((s) => s.$view.id === itemId);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
            return result;
        });
        @modelFlow
        authBase = _async(function* (method, credentials) {
            let result;
            try {
                result = yield* _await(postItemRequest(baseURL, `cookie-${method}`, credentials));
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Network Error",
                });
                error;
                return { details: "Network Error", ok: false, data: null };
            }
            if (!result.ok || !result.data) {
                Swal.fire({
                    icon: "error",
                    title: "An error has occurred.",
                });
            }
            return { details: "", ok: true, data: null };
        });
        @modelAction
        resetItems = function () {
            this.items = [];
        };
    }
    return GenericStore;
}
export const functionBinder = (item) => {
    for (const key of Object.getOwnPropertyNames(item)) {
        if (typeof item[key] === "function") {
            item[key] = item[key].bind(item);
        }
    }
    const proto = Object.getPrototypeOf(item);
    for (const key of Object.getOwnPropertyNames(proto)) {
        if (key === "constructor")
            continue;
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        if (desc?.value && typeof desc.value === "function") {
            item[key] = desc.value.bind(item);
        }
    }
};
export function storesToProps(classes) {
    const result = {};
    for (const key in classes) {
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
        result[camelKey] = prop();
    }
    return result;
}
export function instantiateStores(classes) {
    const result = {};
    for (const key in classes) {
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
        result[camelKey] = new classes[key]({});
    }
    return result; // TS can't infer runtime object shape fully
}
