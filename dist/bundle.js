(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}const t=e=>{let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLength&&(t=t&&e.value.toString().trim().length>e.minLength),null!=e.maxLength&&(t=t&&e.value.toString().trim().length<e.maxLength),null!=e.maxLength&&(t=t&&e.value.toString().trim().length<e.maxLength),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<e.max),t},n=(e,t,n)=>({configurable:!0,get(){return n.value.bind(this)}});var r;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class i extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new i),this.instance}addProject(e,t,n){this.projects.push(new s(Math.random().toString(),e,t,n,r.Active)),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e([...this.projects])}}const l=i.getInstance();class o extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleElement=this.element.querySelector("#title"),this.descriptionElement=this.element.querySelector("#description"),this.peopleElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e={value:this.titleElement.value,required:!0,minLength:2,maxLength:80},n={value:this.descriptionElement.value,required:!0,minLength:2,maxLength:300},r={value:this.peopleElement.value,required:!0,min:1,max:7};if(t(e)&&t(n)&&t(r))return[this.titleElement.value,this.descriptionElement.value,+this.peopleElement.value]}clearForm(){this.titleElement.value="",this.descriptionElement.value="",this.peopleElement.value=""}submitHandler(e){if(e.preventDefault(),Array.isArray(this.gatherUserInput())){const[e,t,n]=this.gatherUserInput();l.addProject(e,t,n),this.clearForm()}}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([n],o.prototype,"submitHandler",null);var a=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class c extends e{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get persons(){return 1===this.project.people?"1 person":`${this.project.people} persons`}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log(e)}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=`${this.persons} assigned`,this.element.querySelector("p").textContent=this.project.description}}a([n],c.prototype,"dragStartHandler",null),a([n],c.prototype,"dragEndHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class h extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){if(e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]){e.preventDefault();const t=this.element.querySelector("ul");console.log(),t.classList.add("droppable")}}dropHandler(e){const t=e.dataTransfer.getData("text/plain");l.moveProject(t,"active"===this.type?r.Active:r.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}renderContent(){this.element.querySelector("ul").id=`${this.type}-project-list`,this.element.querySelector("h2").textContent=`${this.type} projects`.toUpperCase()}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler),l.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.Finished));this.assignedProjects=t,this.renderProjects()}))}renderProjects(){document.getElementById(`${this.type}-project-list`).innerHTML="";for(const e of this.assignedProjects)new c(this.element.querySelector("ul").id,e)}}d([n],h.prototype,"dragOverHandler",null),d([n],h.prototype,"dropHandler",null),d([n],h.prototype,"dragLeaveHandler",null),new o,new h("active"),new h("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnYW5kZHJvcC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL2RyYWdhbmRkcm9wLy4vc3JjL3ZhbGlkYXRvcnMvcHJvamVjdC52YWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC5kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvbW9kZWxzL3Byb2plY3QubW9kZWwudHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvc3RhdGUvcHJvamVjdC5zdGF0ZS50cyIsIndlYnBhY2s6Ly9kcmFnYW5kZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vZHJhZ2FuZGRyb3AvLi9zcmMvYXBwLnRzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QXRCZWdpbm5pbmciLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ2YWxpZGF0ZSIsImlucHV0IiwiaXNWYWxpZCIsInJlcXVpcmVkIiwidmFsdWUiLCJ0b1N0cmluZyIsInRyaW0iLCJsZW5ndGgiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJtaW4iLCJtYXgiLCJBdXRvYmluZCIsIl8iLCJfMiIsImRlc2NyaXB0b3IiLCJjb25maWd1cmFibGUiLCJiaW5kIiwiUHJvamVjdFN0YXR1cyIsIlByb2plY3QiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGVvcGxlIiwic3RhdHVzIiwiUHJvamVjdFN0YXRlIiwibGlzdGVuZXJzIiwibGlzdGVuZXJGbiIsInB1c2giLCJzdXBlciIsInByb2plY3RzIiwiaW5zdGFuY2UiLCJudW1PZlBlb3BsZSIsIk1hdGgiLCJyYW5kb20iLCJBY3RpdmUiLCJ1cGRhdGVMaXN0ZW5lcnMiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJwcm9qZWN0IiwiZmluZCIsIml0ZW0iLCJwcm9qZWN0U3RhdGUiLCJnZXRJbnN0YW5jZSIsIlByb2plY3RJbnB1dCIsInRpdGxlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkZXNjcmlwdGlvbkVsZW1lbnQiLCJwZW9wbGVFbGVtZW50IiwiY29uZmlndXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Ym1pdEhhbmRsZXIiLCJ0aXRsZVZhbGlkYXRvciIsImRlc2NyaXB0aW9uVmFsaWRhdG9yIiwicGVvcGxlVmFsaWRhdG9yIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiaXNBcnJheSIsImdhdGhlclVzZXJJbnB1dCIsImFkZFByb2plY3QiLCJjbGVhckZvcm0iLCJQcm9qZWN0SXRlbSIsImhvc3RJZCIsInJlbmRlckNvbnRlbnQiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImNvbnNvbGUiLCJsb2ciLCJkcmFnU3RhcnRIYW5kbGVyIiwiZHJhZ0VuZEhhbmRsZXIiLCJ0ZXh0Q29udGVudCIsInBlcnNvbnMiLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3RzIiwidHlwZXMiLCJsaXN0RWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImdldERhdGEiLCJtb3ZlUHJvamVjdCIsIkZpbmlzaGVkIiwicmVtb3ZlIiwidG9VcHBlckNhc2UiLCJkcmFnT3ZlckhhbmRsZXIiLCJkcmFnTGVhdmVIYW5kbGVyIiwiZHJvcEhhbmRsZXIiLCJhZGRMaXN0ZW5lciIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJwcmoiLCJyZW5kZXJQcm9qZWN0cyIsImlubmVySFRNTCIsInByb2plY3RJdGVtIl0sIm1hcHBpbmdzIjoibUJBQ08sTUFBZUEsRUFLbEIsWUFDSUMsRUFDQUMsRUFDQUMsRUFDQUMsR0FFQUMsS0FBS0MsZ0JBQ0RDLFNBQVNDLGVBQWVQLEdBQzVCSSxLQUFLSSxZQUNERixTQUFTQyxlQUFlTixHQUU1QixNQUFNUSxFQUNOSCxTQUFTSSxXQUFXTixLQUFLQyxnQkFBZ0JNLFNBQVMsR0FFbERQLEtBQUtRLFFBQVVILEVBQWFJLGtCQUV4QlYsSUFDQUMsS0FBS1EsUUFBUUUsR0FBS1gsR0FHdEJDLEtBQUtXLE9BQU9iLEdBR1IsT0FBT2MsR0FDWFosS0FBS0ksWUFBWVMsc0JBQ2JELEVBQW9CLGFBQWUsWUFBYVosS0FBS1EsVUN0QjFELE1BQU1NLEVBQVlDLElBQ3JCLElBQUlDLEdBQVUsRUEwQmQsT0F4QklELEVBQU1FLFdBQ05ELEVBQVVBLEdBQW9ELElBQXpDRCxFQUFNRyxNQUFNQyxXQUFXQyxPQUFPQyxRQUdoQyxNQUFuQk4sRUFBTU8sWUFDTk4sRUFBVUEsR0FBV0QsRUFBTUcsTUFBTUMsV0FBV0MsT0FBT0MsT0FBU04sRUFBTU8sV0FHL0MsTUFBbkJQLEVBQU1RLFlBQ05QLEVBQVVBLEdBQVdELEVBQU1HLE1BQU1DLFdBQVdDLE9BQU9DLE9BQVNOLEVBQU1RLFdBRy9DLE1BQW5CUixFQUFNUSxZQUNOUCxFQUFVQSxHQUFXRCxFQUFNRyxNQUFNQyxXQUFXQyxPQUFPQyxPQUFTTixFQUFNUSxXQUdyRCxNQUFiUixFQUFNUyxLQUFzQyxpQkFBaEJULEVBQU1HLFFBQ2xDRixFQUFVQSxHQUFXRCxFQUFNRyxNQUFRSCxFQUFNUyxLQUc1QixNQUFiVCxFQUFNVSxLQUFzQyxpQkFBaEJWLEVBQU1HLFFBQ2xDRixFQUFV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S1EsUUFBUW1ELGNBQWMsTUFDbkNpQyxVQUFVSyxPQUFPLGFBRzFCLGdCQUNIakcsS0FBS1EsUUFBUW1ELGNBQWMsTUFBT2pELEdBQzlCLEdBQUdWLEtBQUt3RixvQkFFWnhGLEtBQUtRLFFBQVFtRCxjQUFjLE1BQU8wQixZQUM5QixHQUFHckYsS0FBS3dGLGdCQUFnQlUsY0FHekIsWUFDSGxHLEtBQUtRLFFBQVF1RCxpQkFBaUIsV0FBWS9ELEtBQUttRyxpQkFDL0NuRyxLQUFLUSxRQUFRdUQsaUJBQWlCLFlBQWEvRCxLQUFLb0csa0JBQ2hEcEcsS0FBS1EsUUFBUXVELGlCQUFpQixPQUFRL0QsS0FBS3FHLGFBRTNDOUMsRUFBYStDLGFBQWEzRCxJQUN0QixNQUFNNEQsRUFBbUI1RCxFQUFTNkQsUUFBT0MsR0FDdkIsV0FBZHpHLEtBQUt3RixLQUNFaUIsRUFBSXBFLFNBQVdMLEVBQWNnQixPQUc3QnlELEVBQUlwRSxTQUFXTCxFQUFjZ0UsV0FHeENoRyxLQUFLeUYsaUJBQW1CYyxFQUN4QnZHLEtBQUswRyxvQkFJTCxpQkFDZ0J4RyxTQUFTQyxlQUFlLEdBQUdILEtBQUt3RixxQkFFeENtQixVQUFZLEdBRXhCLElBQUssTUFBTUMsS0FBZTVHLEtBQUt5RixpQkFDM0IsSUFBSWQsRUFBWTNFLEtBQUtRLFFBQVFtRCxjQUFjLE1BQU9qRCxHQUFJa0csSUExRDlELEdBRENsRixHLG9DQVlELEdBRENBLEcsZ0NBVUQsR0FEQ0EsRyxxQ0N2Q0wsSUFBSStCLEVBQ0osSUFBSThCLEVBQVksVUFDaEIsSUFBSUEsRUFBWSxhIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvbXBvbmVudCBCYXNlIENsYXNzICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgICBwcm90ZWN0ZWQgZWxlbWVudDogVTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICAgICAgaG9zdEVsZW1lbnRJZDogc3RyaW5nLFxyXG4gICAgICAgIGluc2VydEF0U3RhcnQ6IGJvb2xlYW4sXHJcbiAgICAgICAgbmV3RWxlbWVudElkPzogc3RyaW5nXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlSWQpISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQgPVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuXHJcbiAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID1cclxuICAgICAgICBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkISBhcyBVO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0QXRCZWdpbm5pbmc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcclxuICAgICAgICAgICAgaW5zZXJ0QXRCZWdpbm5pbmcgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJywgdGhpcy5lbGVtZW50XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICAgIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZXF1aXJlZD86IHRydWU7XHJcbiAgICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtaW4/OiBudW1iZXI7XHJcbiAgICBtYXg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IChpbnB1dDogVmFsaWRhdGFibGUpID0+IHtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgaWYgKGlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dC5taW5MZW5ndGggIT0gbnVsbCkge1xyXG4gICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCA+IGlucHV0Lm1pbkxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5wdXQubWF4TGVuZ3RoICE9IG51bGwpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggPCBpbnB1dC5tYXhMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0Lm1heExlbmd0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoIDwgaW5wdXQubWF4TGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnB1dC5taW4gIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaW5wdXQudmFsdWUgPiBpbnB1dC5taW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlucHV0Lm1heCAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZSA8IGlucHV0Lm1heDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufSIsIi8qIEF1dG9iaW5kIGRlb2NyYXRvciAqL1xyXG5leHBvcnQgY29uc3QgQXV0b2JpbmQgPSAoXHJcbiAgICBfOiBhbnksXHJcbiAgICBfMjogc3RyaW5nLFxyXG4gICAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXHJcbikgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvci52YWx1ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0gYXMgUHJvcGVydHlEZXNjcmlwdG9yO1xyXG59IiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XHJcbiAgICBBY3RpdmUsXHJcbiAgICBGaW5pc2hlZFxyXG59XHJcblxyXG4vKiBQcm9qZWN0ICovXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXHJcbiAgICApIHt9XHJcbn0iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QubW9kZWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IEFycmF5PFQ+KSA9PiB2b2lkO1xyXG4gICAgXHJcbmV4cG9ydCBjbGFzcyBTdGF0ZTxUPiB7XHJcbiAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBBcnJheTxMaXN0ZW5lcjxUPj4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiBQcm9qZWN0IFN0YXRlIE1hbmFnZW1lbnQqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcclxuICAgIHByaXZhdGUgcHJvamVjdHM6IEFycmF5PFByb2plY3Q+ID0gW107XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUHJvamVjdChcclxuICAgICAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgbnVtT2ZQZW9wbGU6IG51bWJlclxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgUHJvamVjdChcclxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBudW1PZlBlb3BsZSxcclxuICAgICAgICAgICAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgoaXRlbTogUHJvamVjdCkgPT4gaXRlbS5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJGbihbLi4udGhpcy5wcm9qZWN0c10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0YWJsZSwgdmFsaWRhdGUgfSBmcm9tICcuLi92YWxpZGF0b3JzL3Byb2plY3QudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLmRlY29yYXRvcic7XHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Quc3RhdGUnO1xyXG5cclxudHlwZSBmb3JtRmllbGRzID0gW3N0cmluZywgc3RyaW5nLCBudW1iZXJdO1xyXG5cclxuLyogUHJvamVjdCBJbnB1dCAqL1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxGb3JtRWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+IHtcclxuICAgIHByaXZhdGUgdGl0bGVFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBkZXNjcmlwdGlvbkVsZW1lbnQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHBlb3BsZUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbkVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW9wbGUnKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXJDb250ZW50KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBmb3JtRmllbGRzIHwgdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGl0bGVWYWxpZGF0b3I6IFZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy50aXRsZUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIG1heExlbmd0aDogODBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRvcjogVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmRlc2NyaXB0aW9uRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgbWF4TGVuZ3RoOiAzMDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBwZW9wbGVWYWxpZGF0b3I6IFZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wZW9wbGVFbGVtZW50LnZhbHVlLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiAxLFxyXG4gICAgICAgICAgICBtYXg6IDdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHZhbGlkYXRlKHRpdGxlVmFsaWRhdG9yKSAmJlxyXG4gICAgICAgICAgICB2YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRvcikgJiZcclxuICAgICAgICAgICAgdmFsaWRhdGUocGVvcGxlVmFsaWRhdG9yKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uRWxlbWVudC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICt0aGlzLnBlb3BsZUVsZW1lbnQudmFsdWVcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZm9ybUVsZW1lbnQuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmlubmVySFRNTCA9ICdIZWxsbyEnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyRm9ybSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb25FbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgQEF1dG9iaW5kXHJcbiAgICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdhdGhlclVzZXJJbnB1dCgpKSkge1xyXG4gICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUgXSA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCkgYXMgZm9ybUZpZWxkcztcclxuICAgICAgICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRm9ybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBBdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQuZGVjb3JhdG9yJztcclxuXHJcblxyXG4vKiBQcm9qZWN0IEl0ZW0gKi9cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XHJcbiAgICBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xyXG5cclxuICAgIGdldCBwZXJzb25zKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEgPyAnMSBwZXJzb24nOiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBBdXRvYmluZFxyXG4gICAgcHVibGljIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIEBBdXRvYmluZFxyXG4gICAgcHVibGljIGRyYWdFbmRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXJDb250ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSBgJHt0aGlzLnBlcnNvbnN9IGFzc2lnbmVkYDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLmRlY29yYXRvcic7XHJcbmltcG9ydCB7IFByb2plY3RTdGF0dXMsIFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdC5tb2RlbCc7XHJcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSAnLi9wcm9qZWN0LWl0ZW0nO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LnN0YXRlJztcclxuXHJcbi8qIFByb2plY3QgTGlzdCAqL1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTEVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PlxyXG4gICAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICAgIHByaXZhdGUgYXNzaWduZWRQcm9qZWN0czogQXJyYXk8UHJvamVjdD47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcclxuICAgICAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApXHJcblxyXG4gICAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmVsZW1lbnQuaWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzYDtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBAQXV0b2JpbmRcclxuICAgIHB1YmxpYyBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygpXHJcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAQXV0b2JpbmRcclxuICAgIHB1YmxpYyBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdElkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICAgICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxyXG4gICAgICAgICAgICBwcm9qZWN0SWQsXHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWRcclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBBdXRvYmluZFxyXG4gICAgcHVibGljIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICAgIGxpc3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9XHJcbiAgICAgICAgICAgIGAke3RoaXMudHlwZX0tcHJvamVjdC1saXN0YDtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgYCR7dGhpcy50eXBlfSBwcm9qZWN0c2AudG9VcHBlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG5cclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihwcmogPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnYWN0aXZlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGApISBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG5cclxuICAgICAgICBsaXN0RWxlbWVudC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9qZWN0SXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCwgcHJvamVjdEl0ZW0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0JztcclxuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0JztcclxuXHJcbiAgICBcclxubmV3IFByb2plY3RJbnB1dCgpOyAgICBcclxubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcclxubmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9