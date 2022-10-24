const button = document.querySelector('button');

button.addEventListener('click', () => {
    Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
            const notification = new Notification("Example notification", {
                body: "This is more text",
                data: { hello: 'world' },
                // icon: 'icon-name.png',
            });

            notification.addEventListener('close', (e) => {
                console.log(e);
            });
        }
    })
});