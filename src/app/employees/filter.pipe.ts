import { Pipe, PipeTransform } from '@angular/core';
import { employeeModel } from './employee.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: employeeModel[], searchTerm: string): any {
    return value.filter((data:any) => data.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }

}
