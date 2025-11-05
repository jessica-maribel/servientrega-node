require('./database');
const app= require('./app')
app.listen(app.get('puerto'), ()=>{
 console.log('Nombre de la App',app.get('nombreApp'));
 console.log('Puerto del servidor',app.get('puerto'));
})