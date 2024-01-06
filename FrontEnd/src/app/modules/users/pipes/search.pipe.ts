import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allUsers:any[],searchKey:string): any[] {
    const result:any = []
    if (!allUsers || searchKey == "")
    {
      return allUsers
    }
    allUsers.forEach((item: any) => {
      // item.name = searchKey
      if(item.name.toLowerCase().trim().includes(searchKey.trim().toLocaleLowerCase()))
      {
        return result.push(item)
      }
    })
    return result  // particular person details
  }

}
