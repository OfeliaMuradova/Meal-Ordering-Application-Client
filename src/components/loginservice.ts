import Vue from 'vue';
import axios from 'axios';
import Component from 'vue-class-component';
import { apiUrl, getHeader } from 'src/api/api'

@Component({})
export default class LoginService extends Vue{
    login(data: any) {
        return new Promise(function (resolve, reject) {
              axios.post(apiUrl + '/token/generate-token', data)
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        });
    }
}