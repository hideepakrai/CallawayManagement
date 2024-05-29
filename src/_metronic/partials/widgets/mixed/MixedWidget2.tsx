
import {useEffect, useRef, FC} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import image3 from "../../../../../public/media/icons/logo-white.png"
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import { getApparelProducts } from '../../../../app/slice/allProducts/CallawayApparelSlice'
import { useSelector } from 'react-redux'
type Props = {
  className: string
  chartColor: string
  strokeColor: string
  chartHeight: string
}

const MixedWidget2: FC<Props> = ({className, chartColor, chartHeight, strokeColor}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor)
    )
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()
    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])
  const getApparelProduct= useSelector(getApparelProducts)
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}

      <div className={`card-header row m-0 border-0 py-5`}  style={{backgroundColor:"#000"}}>
        <div className='col-6'>
        <h3 className='card-title fw-bold text-white pt-4'>Callaway Apparel </h3>
        </div>

        <div className='card-toolbar col-6 justify-content-end'>                
       <img width="100" src={image3}></img>
             
        </div>

      </div>


      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Chart */}
        <div
          ref={chartRef}
          className={`mixed-widget-2-chart card-rounded-bottom ` }
          style={{backgroundColor:"#000"}}
        ></div>
        {/* end::Chart */}
        {/* begin::Stats */}
        <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-4 pt-7 rounded-2 me-7 mb-7'>
              {/* <KTIcon iconName='chart-simple' className='fs-3x text-warning d-block my-2' /> */}
              <a href='#' className=' fw-semibold fs-6' style={{color:"#141414"}} >
              <span className='fs-1 fw-bold text-warning' style={{lineHeight:"35px",}}> {getApparelProduct.length} </span> <br></br> Total Products     
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}

            <Link className ={ clsx ('col bg-light-primary px-4 pt-4 pb-8 rounded-2 mb-7')} to={"/brand/travis-methew"} >
              <KTIcon iconName='plus' className='fs-3x text-primary d-block mt-2' />
              <a href='#' className='text-primary fw-semibold fs-6'style={{color:"#141414"}}  >
              Create Order
              </a>
          
            </Link>


            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
          <div className='row g-0'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-4 py-8 rounded-2 me-7'>
              {/* <KTIcon iconName='abstract-26' className='fs-3x text-danger d-block my-2' /> */}
              <a href='#' className=' fw-semibold fs-6 mt-2' style={{color:"#141414"}}>
               
              <span className='fs-1 fw-bold text-danger'>0 </span> <br></br> Complete Orders  
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-8 rounded-2'>
              {/* <KTIcon iconName='sms' className='fs-3x text-success d-block my-2' /> */}
              <a href='#' className=' fw-semibold fs-6 mt-2' style={{color:"#141414"}}>
               
              <span className='fs-1 fw-bold text-success'>0 </span> <br></br> Pending Orders  
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
        {/* end::Stats */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (
  chartHeight: string,
  chartColor: string,
  strokeColor: string
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const color = getCSSVariableValue('--bs-' + chartColor)

  return {
    series: [
      {
        name: 'Net Profit',
        data: [30, 45, 32, 70, 40, 40, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['transparent'],
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget2}
