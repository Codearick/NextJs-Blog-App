import { Client, Account, ID } from "appwrite";
import Config from "../config/config";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(Config.appwriteUrl) // Your API Endpoint
            .setProject(Config.appwriteProjectId); // Your project ID

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create
                (ID.unique(), email, password, name);
            if (userAccount) {
                //calling login method to login.
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error.message);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error is ",error.message);
        }
        return null;
    }

    async logout() {
        try {
          await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error ",error.message)
        }
    }
}

const authService = new AuthService();

export default authService;