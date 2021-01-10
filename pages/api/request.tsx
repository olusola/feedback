import firebase from 'firebase'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import db from '../../src/firebase'

const onNoMatch = (req, res) => {
  res.status(405).json({error: `Method ${req.method} Not Allowed!!!`})
}

const handler = nc<NextApiRequest, NextApiResponse>({onNoMatch})

handler.post(async (req, res) => { 
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  if (req.body) {
    const { name, up, down, message, p_key } = req.body
    const widgetData = {
      name,
      up,
      down,
      message,
    }

    await db.collection("users").doc(p_key).collection("widgets").doc("data")
    .update({
      all: firebase.firestore.FieldValue.arrayUnion({...widgetData})
    })
    .catch((error) => console.log('error writing document', error))

    res.json({
      status: "success"
    })

  } else{
    res.json({status: "no body available!"})
  }
})

export default handler;