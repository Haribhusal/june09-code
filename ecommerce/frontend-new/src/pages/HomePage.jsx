import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByNumber, decrementByNumber } from '../redux/features/counterSlice'


const HomePage = () => {

    const dispatch = useDispatch();
    let count = useSelector((state) => state.counter.value)
    return (
        <section className='py-10'>
            {/* <div className="container max-w-7xl mx-auto">
                <h3 className='text-5xl font-bold text-red-500'>Counter: {count}</h3>
                <button onClick={() => dispatch(increment())} className='custom_button'>Increment</button>
                <button onClick={() => dispatch(decrement())} className='custom_button'>Decrement</button>
                <button onClick={() => dispatch(incrementByNumber(5))} className='custom_button'>Increment by 5</button>
                <button onClick={() => dispatch(decrementByNumber(7))} className='custom_button'>Decrement by 7</button>
            </div> */}
        </section>
    )
}

export default HomePage