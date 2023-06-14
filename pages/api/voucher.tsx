import puppeteer from 'puppeteer';
import { NextApiRequest, NextApiResponse } from 'next';

import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheets } from '@mui/styles';
import Voucher from '../../components/voucher.component';
import MyContext from '../../contexts/MainContext';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const contextValue = req.body;
        // Lógica para generar el PDF con Puppeteer y el contexto
        console.log('contextValue', contextValue);

        const sheets = new ServerStyleSheets();

        const componentHtml = renderToStaticMarkup(
            sheets.collect(
                <MyContext.Provider value={contextValue}>
                    <Voucher amount="12345" />
                </MyContext.Provider>
            )
        );

        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            html { -webkit-print-color-adjust: exact; }
            ${sheets.toString()}
          </style>
        </head>
        <body>
          ${componentHtml}
        </body>
      </html>
    `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.emulateMediaType();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=my-file.pdf'
        );
        res.setHeader('Content-Length', pdfBuffer.length);

        res.send(pdfBuffer);

        await browser.close();
    }
}
