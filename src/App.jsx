import Swal from 'sweetalert2'
import { useState } from 'react';
import { Details } from './Details'
import './App.css'

function App() {

  const [newIp, setNewIp] = useState('')
  const [detail, setDetail] = useState()

  const validateInput = () => {
    if (newIp == '') {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Completa este campo!",
        showConfirmButton: false,
        timer: 1500
      });
      return false
    }
    return true
  }


  const handleBtn = (e) => {
    e.preventDefault();
    console.log(newIp)
    if (validateInput()) {


      const options = {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        headers: {
          'X-RapidAPI-Key': '528e72f22cmshe01bd3eeabf89ddp1b1108jsn946288786480',
          'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
        }
      }

      fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${newIp}`, options)
        .then((res) => { return res.json() })
        .then((res) => {
          console.log(res)
          if (!res.success) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Ip invalida!",
              showConfirmButton: false,
              timer: 1500
            })
            setDetail()

          } else
            setDetail(res)
        })

    }



  }

  const handleNew = (e) => {
    setNewIp(e.target.value)

  }

  const handleBtnIp = () => {
    const options = {
      method: 'GET',
      url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
      headers: {
        'X-RapidAPI-Key': '528e72f22cmshe01bd3eeabf89ddp1b1108jsn946288786480',
        'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
      }
    }
    fetch(`https://api.ipify.org/?format=json`)
      .then((res) => res.json())
      .then((res) => {
        fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${res.ip}`, options)
          .then((res) => { return res.json() })
          .then((res) => {
            console.log(res)
            setDetail(res)
          })
      })

  }




  return (

    <div className='container'>
      <div>
        <div className='d-flex align-items-center justify-content-center gap-5'>
          <img className='my-5' src='https://cdn-icons-png.flaticon.com/128/5331/5331941.png' />
          <h1 className='fw-bold text-primary-emphasis d-none d-sm-block' >Tu Informacion de confianza</h1>
        </div>

        <h3 className='text-secondary '>INGRESA TU IP:</h3>

      </div>
      <div>
        <form onSubmit={handleBtn}>

          <input required placeholder='98.75.25.90...' onChange={handleNew} type="search" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />


          <div>
            <div className="d-grid gap-2 my-3">
              <button className="btn btn-primary" type="submit" >Buscar informacion de esta IP</button>
              <button className="btn btn-secondary" type="button" onClick={handleBtnIp}>Obten tu IP</button>
            </div>
          </div>
        </form>

      </div>

      {detail !== undefined && <Details ip={detail.ip}
        continent={detail.continent}
        country={detail.country}
        country_capital={detail.country_capital}
        currency={detail.currency}
        currency_rates={detail.currency_rates}
        isp={detail.isp} />}
      {detail !== undefined &&
        <>
          <h3 className='my-1 text-secondary '>TU UBICACION</h3>
          <div className='d-flex flex-column align-items-center p-5'>

            <iframe src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d15692.68285576643!2d${detail.longitude}!3d${detail.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1ses!2sve!4v1701464117571!5m2!1ses!2sve`} width="300" height="350" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </>}
    </div>
  )
}

export default App


// detalle del ip 