import axios from "axios";

import { nanoid } from 'nanoid'
const CryptoJS = require("crypto-js");

const BASE_API_URL = "http://localhost:8000/api";

export const Paste = {
	get(id: string) {
		return axios.get(`${BASE_API_URL}/pastes/${id}`);
	},

	create<T extends { text: string }>(data: T) {
		return axios.post(`${BASE_API_URL}/pastes`, data);
	},

	delete(uuid: string, owner_key: string) {
		return axios.delete(`${BASE_API_URL}/pastes/${uuid}`, {
			data: { owner_key },
		});
	},

	encrypt(text: string) {
		const passphrase = "#" + nanoid();
		const encrypted = CryptoJS.AES.encrypt(text, passphrase).toString();

		return { passphrase, encrypted };
	},

	decrypt(context: string = "", passphrase: string) {
		let payload = {
			malformed: true,
			text: '',
		}
		
		try {
			payload = {
				malformed: false,
				text: CryptoJS.AES.decrypt(context, passphrase).toString(CryptoJS.enc.Utf8),
			};
		} catch { }

		return payload
	},

	claim(pasteId: string, secret: string) {
		localStorage.setItem(pasteId, secret);
	},
};

export const User = {
	owns(pasteId: string) {
		return !!localStorage.getItem(pasteId);
	},
};
