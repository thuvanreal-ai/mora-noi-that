export default function CustomerFields() {
  return <>
    <label>Họ và tên *<input className="input" name="name" autoComplete="name" required maxLength={120}/></label>
    <label>Số điện thoại *<input className="input" name="phone" autoComplete="tel-national" required inputMode="tel" pattern="0[0-9]{9,10}" title="Số điện thoại bắt đầu bằng 0, gồm 10–11 số" maxLength={11}/></label>
    <label>Số nhà *<input className="input" name="house_number" required maxLength={100}/></label>
    <label>Đường *<input className="input" name="street" required maxLength={160}/></label>
    <label>Phường / xã *<input className="input" name="ward" required maxLength={120}/></label>
    <label>Tỉnh / thành phố *<input className="input" name="province" autoComplete="address-level1" required maxLength={120}/></label>
    <label className="fullWidth">Ghi chú<textarea className="input" name="note" rows={3} maxLength={2000} placeholder="Màu mong muốn, vị trí lắp, nhu cầu lưu trữ…"/></label>
    <input className="hpField" tabIndex={-1} autoComplete="off" aria-hidden="true" name="company_website" aria-label="Để trống trường này"/>
  </>;
}
