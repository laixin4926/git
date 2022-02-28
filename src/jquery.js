window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray==='string'){
         elements = document.querySelectorAll(selectorOrArray)//找到所有的元素
    }else if(selectorOrArray instanceof Array)
    {
         elements = selectorOrArray
    }

    function createElement(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
      }
    
        const api =Object.create(jQuery.prototype)
        
        Object.assign(api,{
            elements:elements,
            oldApi:selectorOrArray.oldApi
        })
        return api
        
    }
    jQuery.fn=jQuery.prototype={
        jquery: true,
        get(index){
            return this.elements[index]
          },
          appendTo(node){
            if(node instanceof Element){
              this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
            }else if(node.jquery === true){
              this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
            }
          },
          append(children){
            if(children instanceof Element){
              this.get(0).appendChild(children)
            }else if(children instanceof HTMLCollection){
              for(let i =0;i<children.length;i++){
                this.get(0).appendChild(children[i])
              }
            }else if(children.jquery === true){
              children.each(node => this.get(0).appendChild(node))
            }
          },
          find(selector){
              let array =[]
              for(let i =0;i<this.elements.length;i++){
                  const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
                  array = array.concat(elements2)
              }
              array.oldApi =this //api1
             const newApi =jQuery(array)
             return newApi
          },
         each(fn){
          for(let i=0;i<this.elements.length;i++){
              fn.call(null,this.elements[i],i)
          }
          return this
         },
         parent(){
             const array =[]
              this.each((node)=>{if(array.indexOf(node.parentNode)===-1)array.push(node.parentNode)})
              return jQuery(array)
         },
         children(){
          const array = []
          this.each((node)=>{
            array.push(...node.children)
    
          })
          return jQuery(array)
        },
         print(){
              console.log(this.elements)
          },
          addClass(className)
          {
              for(let i=0;i<this.elements.length;i++){
                this.elements[i].classList.add(className)
              }
              return this
          },
          end(){
              return this.oldApi
          },
    }
   

Window.$=window.jQuery