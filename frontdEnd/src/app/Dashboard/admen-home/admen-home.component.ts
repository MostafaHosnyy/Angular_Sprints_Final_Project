import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdmenService } from 'src/app/services/Admen/admen.service';
import { ProductsService } from 'src/app/services/user/products/products.service';

@Component({
  selector: 'app-admen-home',
  templateUrl: './admen-home.component.html',
  styleUrls: ['./admen-home.component.css']
})
export class AdmenHomeComponent {
  allUsers:any=[]
  allProducts:any=[]
  allOrders:any=[]
  type=''
  active=false
  data:any
constructor(private admen:AdmenService,private router : Router,private product:ProductsService){
  admen.isAdmen=true;
  if(!(localStorage.getItem('token'))|| !(JSON.parse(localStorage.getItem('admen')||'').userType=='Admen')){
    router.navigateByUrl('/ADMEN')
  }
  admen.allUsers().subscribe((res)=>{
    this.allUsers=res.data
  },e=>{
    console.log(e)
  })
  admen.allProducts().subscribe((res)=>{
    this.allProducts=res.data
    console.log('products',res)

  })
  admen.allOrders().subscribe((res)=>{
    this.allOrders=res.data
    console.log('orders',res)

  })

}
handleUsers(){
  this.data=this.allUsers
  this.type='user'
  this.active=true
}
handleOrders(){
  this.data=this.allOrders
  this.type='order'
  this.active=true
}
handleProducts(){
  this.data=this.allProducts
  this.type='product'
  this.active=true
}

handleDelete(type:string,id:string){
if(type=='order'){
  this.admen.deleteOrder(id).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/ADMEN/Home'])

  })
  })
}if(type=='product'){
  this.admen.deleteProduct(id).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/ADMEN/Home'])

  })
  })
}if(type=='user'){
  this.admen.deleteUser(id).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/ADMEN/Home'])

  })
  })
}
}
}

