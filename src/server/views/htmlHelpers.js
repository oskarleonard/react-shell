import { html } from 'common-tags';

export const getHtml = ({ cssHash, js, stateJson, styles, reactDomString }) => {
  return html`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no">
        ${styles}
    </head>
    <body>
        <div id="root">${reactDomString}</div>
        ${cssHash}
${js}
        <script>window.__SERVER_STATE__=${stateJson}</script>
    </body>
</html>
`;
};
