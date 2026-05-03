
import CustomProductHook from "../customProductHook"

const DUMMY_PRODUCTS =[
  {id:'p1',name:'nike-shoe',price:2500 ,size:40 ,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'},
  {id:'p2',name:'canvas-High top',price:2500,size:39 ,image:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000'},
  {id:'p3',name:'modern-athletic runner',price:2500,size:43 ,image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000'},
  {id:'p4',name:'Blue suede Urban shoe',price:2500,size:41 ,image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000'},
  {id:'p5',name:'Leather Puma shoe',price:2500,size:38 ,image:'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000'},
  {id:'p6',name:'Leather Puma shoe',price:2500,size:38 ,image:'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000'},
  {id:'p7',name:'Leather Nike sneaker',price:2500,size:38 ,image:'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000'},
  {id:'p',name:'Leather Nike shoe',price:2500,size:38 ,image:'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000'},

]

function App() {
  return (
    <>
    <div className=" flex flex-col bg-[url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=60&w=900)] bg-cover bg-center bg-no-repeat h-screen  w-full">
    <h1 className="text-4xl  lg:text-7xl font-bold tracking-tight text-white leading-snug ">Have your Next generation aspects of fashion</h1>
    <p className="text-2xl text-gray-400">treat yourself with sneakers from Jaha</p>
    <button className="flex text-white justify-start mt-20 max-w-60 border ml-6 mx-auto p-2 px-8 rounded-xl  hover:bg-gray-400 transition-all transform active:scale-105">shop now</button>
    </div>

    <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 justify-items-center ">
      {DUMMY_PRODUCTS.map(product => <li key={product.id}>
        <CustomProductHook  product={product} />
      </li>)}
    </ul>
    
    </>
    
  )
}

export default App
