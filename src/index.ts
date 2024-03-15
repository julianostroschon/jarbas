import { notify } from "./services/notify";
import type { EnvironmentVariables } from './contracts'
import { validateRequest } from "./util/validation";
import { constructMessage } from "./util";

export default {
	async fetch(request: Request, env: EnvironmentVariables) {
    validateRequest(request)

    const { message, receivers } = await constructMessage(request)

    await notify(message, env, receivers)
    
		return new Response('Hello World!' + JSON.stringify({ receivers }) + (message));
	},
};
