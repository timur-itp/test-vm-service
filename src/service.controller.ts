import { Request, Response, Router } from 'express';
import Controller from './interfaces/controller.interface';
import * as vm from 'vm';

class TestServiceController implements Controller {
    public path = '/test';
    public router = Router();
  
    constructor() {
      this.initializeRoutes();
    }

      
    private initializeRoutes() {
      this.router.post(`${this.path}`, this.generateReport);
    }
  
    private generateReport = async (request: Request, response: Response) => {
        try {

            const context = { result: "" };
            vm.createContext(context);
            const code = String(request.query.code);
            vm.runInContext(code, context);
            return response.status(200).send({ result: context.result });
        } catch (e) {
            console.log(e);
            return response.status(500).send({ message: `Error: ${e.message}` });
        }
    }
}

export default TestServiceController;