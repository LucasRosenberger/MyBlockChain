export class MainController {
    private static instance : MainController;
    public static getInstance() : MainController {
        return !this.instance ? this.instance = new MainController() : this.instance;
    }
    private constructor(){
        
    }
    public testRoute(req,res){
        res.send("API succesfully set up!");
    }
}