import { v4 } from 'uuid';

export class AuthController {

    static async getAnonToken(req, res) {
        const uuid = v4();
        res.status(200).json({anon_token: uuid});
    }
}