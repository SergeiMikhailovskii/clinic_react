import {loginUser} from "../../models/AppModel";
import {handleResponseCookies} from "./Login";

test('test1', () => {
    return loginUser({login: 'admin', password: 'admin'}).then(data => {
        expect(data.isAdmin).toBe(true)
    })
});

test('test2', () => {
    return loginUser({}).then(data => {
        expect(data.success).toBe(false)
    })
});

test('test3', () => {
    return loginUser({login: 'admin', password: 'admin'}).then(data => {
        const cookie = handleResponseCookies(data.isAdmin);
        return expect(cookie).toMatch("true");
    });
});
