import type { Plugin } from "vue";



export const componentsConfig = () : Plugin => {
    return {
        install(app, ...options) {


            app.config.errorHandler = (err, vm, info) => {
                console.log(err, vm, info)
            }
            
        },
    }
}