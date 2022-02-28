window.jQuery = function(selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === 'string') elements = document.querySelectorAll(selectorOrArray) //找到所有的元素
    ;
    else if (selectorOrArray instanceof Array) elements = selectorOrArray;
    return {
        find (selector) {
            let array = [];
            for(let i = 0; i < elements.length; i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector));
                array = array.concat(elements2);
            }
            array.oldApi = this //api1
            ;
            const newApi = jQuery(array);
            return newApi;
        },
        each (fn) {
            for(let i = 0; i < elements.length; i++)fn.call(null, elements[i], i);
            return this;
        },
        parent () {
            const array = [];
            this.each((node)=>{
                if (array.indexOf(node.parentNode) === -1) array.push(node.parentNode);
            });
            return jQuery(array);
        },
        children () {
            const array = [];
            this.each((node)=>{
                array.push(...node.children);
            });
            return jQuery(array);
        },
        print () {
            console.log(elements);
        },
        addClass (className) {
            for(let i = 0; i < elements.length; i++)elements[i].classList.add(className);
            return this;
        },
        end () {
            return this.oldApi;
        },
        oldApi: selectorOrArray.oldApi
    };
};

//# sourceMappingURL=index.51585d64.js.map
