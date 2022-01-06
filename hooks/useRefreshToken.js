export default function useRefreshToken() {
	const refreshToken = (res) => {
		let refreshTimeout = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

		const refreshToken = async () => {
			const newAuthRes = await res.reloadAuthResponse();
			refreshTimeout = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
			console.log("newAuthRes: ", newAuthRes);
			console.log("new auth token: ", newAuthRes.id_token);
			setTimeout(refreshToken, refreshTimeout);
		};
		setTimeout(refreshToken, refreshTimeout);
	};
	return refreshToken;
}
