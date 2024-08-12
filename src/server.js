const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/webflow', async (req, res) => {
    const { name, email, whatsapp } = req.body.payload.data;
    const newUser = {
        "parent": {
            "type": "database_id",
            "database_id": `${process.env.NOTION_DATABASE_ID}`
        },
        "properties": {
            "Nome": {
                "title": [
                    {
                        "text": {
                            "content": `${name}`
                        }
                    }
                ]
            },
            "Email": {
                "rich_text": [
                    {
                        "text": {
                            "content": `${email}`
                        }
                    }
                ]
            },
            "Telefone": {
                "rich_text": [
                    {
                        "text": {
                            "content": `${whatsapp}`
                        }
                    }
                ]
            },
            "Tag": {
                "multi_select": [
                    {
                        "name": "Inscrição Completa"
                    },
                    {
                        "name": "Novo"
                    }
                ]
            }
        }
    }
    try {
        const response = await axios.post('https://api.notion.com/v1/pages', newUser, {
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
            },
        });
        res.status(200).send('Dados enviados com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao enviar dados para o Notion.');
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});