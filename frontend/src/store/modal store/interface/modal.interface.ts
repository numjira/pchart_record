interface modal_data{
  count : any;
}
export interface ModalDataForm{
  data: modal_data;
  setdata:(newData : modal_data)=> void;
}