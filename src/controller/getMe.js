export default function getMe(req, res){
  const me = res.locals.user;
  res.status(200).send(me);
}