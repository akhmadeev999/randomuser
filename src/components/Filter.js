import {useState, useEffect} from "react";

export const Filter = ({ filterChange }) => {
    const defaultState = {
        'g1': {
            id: 'g1',
            type: 'radio',
            title: 'Фильтр по полу',
            data: [
                {id: 0, title: 'Все', isChecked: true, value: 'all'},
                {id: 1, title: 'Только женщины', value: 'female'},
                {id: 2, title: 'Только мужчины', value: 'male'}
            ]
        },
        'g2': {
            id: 'g2',
            type: 'checkbox',
            title: 'Фильтр по возрастным группам',
            data: [
                {id: 0, title: '0-18', value: { min: 0, max: 18 }},
                {id: 1, title: '18-35', value: { min: 18, max: 35 }},
                {id: 2, title: '35-65', value: { min: 35, max: 65 }},
                {id: 3, title: '65+', value: { min: 65, max: 100 }},
            ]
        },
    }
    const [groupe, setGroupe] = useState(defaultState);
    const onClick = ({ gid, id, type })=>{
        let data = [...groupe[gid].data];

        data.map(item => {
            if(item.id === id){
                item['isChecked'] = !item['isChecked'];
            }else if(type === 'radio'){
                item['isChecked'] = false;
            }
        })
        setGroupe({...groupe, [gid]:{ ...groupe[gid], data} })
    }

    useEffect(()=>{
        filterChange(groupe)
    }, [groupe])

    return (
        <div className={'filters'}>
            {
                Object.values(groupe).map(item => (
                    <div className={'filters__groupe'}>
                        <div className={'filters__groupe__h'}>{ item.title }</div>
                        <div className={'filters__groupe__body'} datafld={item.type}>
                            {
                                item.data?.map(inp => (
                                    <div onClick={()=> onClick({gid: item.id, id: inp.id, type: item.type})} className={'filters__input_wrap'} datafld={item.type}>
                                        <span className={`input input_${item.type} ${inp.isChecked && 'checked'}`}></span>
                                        { inp.title }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

        </div>
    )
};
