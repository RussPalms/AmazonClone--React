go to vscode settings > search "emmet" > add a new item: {javascript: javascriptreact}
install "Auto Rename Tag" vscode extension
-> yarn add @heroicons/react
-> yarn add react-responsive-carousel
-> yarn remove react-responsive-carousel
-> yarn add react-responsive-carousel@3.2.18
-> yarn add react-currency-formatter
-> yarn add next-auth
install "ENV" vscode plugin
-> yarn add firebase
Credentials do not work if API is not enabled. In my case the next steps were needed:

-   Go to https://console.developers.google.com/apis/library
-   Enter 'People'
-   From the result choose 'Google People API'
-   Click 'Enable'

-> yarn add stripe @stripe/stripe-js
-> yarn add axios
-> yarn add micro firebase-admin
-> yarn add moment
-> ./stripe login
-> ./stripe listen --forward-to localhost:3000/api/webhook
