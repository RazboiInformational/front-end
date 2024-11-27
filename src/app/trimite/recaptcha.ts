export function getToken(action: string): Promise<string> {
	return ready().then(() =>
		window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
			action,
		})
	);
}

function ready(): Promise<void> {
	if (window.grecaptcha) {
		return new Promise((resolve) => {
			window.grecaptcha.ready(() => {
				resolve();
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			const script = document.getElementById('grecaptcha');

			if (!script) {
				reject(new Error('There is no script for gRECAPTCHA'));
				return;
			}

			const onLoad = () => {
				teardown();

				window.grecaptcha.ready(() => {
					resolve();
				});
			};

			const onError = (event: ErrorEvent) => {
				teardown();
				reject(event);
			};

			script.addEventListener('load', onLoad);
			script.addEventListener('error', onError);

			const teardown = () => {
				script.removeEventListener('load', onLoad);
				script.removeEventListener('error', onError);
			};
		});
	}
}
