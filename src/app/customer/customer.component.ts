import { Component } from '@angular/core';
import { CustomerService } from '../cutomerget.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  
})
export class CustomerComponent {

  newCustomer: any = {}; 

  name:string='';

  mobile:string='';

  place:string='';

  editOn:boolean=false;

  constructor(private customerService: CustomerService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (data: any[]) => {
        this.customerService.setCustomers(data);
      },
      (error) => {
        console.error('Error loading customers:', error);
      }
    );
  }

  getCustomers(): any[] {
    return this.customerService.getCustomers();
  }
  addCustomer(name:string,mobile:string,place:string){
    const customerData = {
      customername:name,
      mobile: mobile,
      customeraddress: place
    };
    this.customerService.addCustomer(customerData).subscribe(
      (response) => {
        console.log('Customer added', response);
        // Assuming the server responds with the added customer data
        this.loadCustomers();
        // Optionally, you can reset the input fields
        this.name = '';
        this.mobile = '';
        this.place = '';
      },
      (error) => {
        console.error('Error adding customer:', error);
      }
    );

  }

  deleteCustomer(customer: any,event:Event): void {
    const customerId = customer.customerid;

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to Delete customer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.deleteById(customerId).subscribe(
          (response) => {
            console.log('Server response:', response);
            this.loadCustomers();
          },
          (error) => {
            console.error('Error deleting customer:', error);
          }
        );
      },
      reject: () => {
          
      }
  });
  }
  editCustomer(customer:any):void{
    customer.editOn = true;
  }
  EditSubmit(id:number,name:string,mobile:string,place:string){
    const customerData = {
      customerid:id,
      customername:name,
      mobile: mobile,
      customeraddress: place
    };
    this.customerService.UpdateCustomer(customerData).subscribe(
      (response) => {
        console.log('Customer Updated', response);
        this.loadCustomers();
      },
      (error) => {
        console.error('Error adding customer:', error);
      }
    );

  }
  delAll(event:Event){

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to Delete customer?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.DeleteAll().subscribe(
          (response) => {
            console.log( response);
            this.loadCustomers();
          },
          (error) => {
            console.error('Error adding customer:', error);
          }
        );
      },
      reject: () => {
          
      }
  });
  }
  
}
