'use strict';

export async function getBooks(req, res) {
  try {


    return res.send({
        ok: true,
        books: 'Data',
    });
    
  } catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
}
