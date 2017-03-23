import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CalvinAndHobbes extends EventEmitter {

   constructor() {
      super()
      this.imgSrc = {
			url: [],
			error: false
		}
      
   }

   getImgSrc() {
      return this.imgSrc;
   }

   handleActions(action) {
      switch (action.type) {
         case "FETCHING_IMAGE_SUCCESS": {
            this.imgSrc.url = action.payload
            this.emit("change")
            break
         }
         case "FETCHING_IMAGE_ERROR": {
				this.imgSrc.error = action.payload
            this.emit("change")        
            break
         }
         case "FETCHING_IMAGE": {
            this.emit("change")        
            break
         }
      }
   }
   
}

const calvinAndHobbes = new CalvinAndHobbes
dispatcher.register(calvinAndHobbes.handleActions.bind(calvinAndHobbes))

export default calvinAndHobbes
