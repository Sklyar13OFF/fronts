const BASE_URL = 'http://127.0.0.1:8000/v1/'
const BASE_FRONT = 'http://localhost:3000/'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export async function GetTxs(id,cryptos) {
    const logdata =
    {
        "cryptos": cryptos
    }
    try {
        const response = await fetch(`${BASE_URL}strategies/${id}/get_opened_transaction_by_names/`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
            body: JSON.stringify(logdata),

        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData

    } catch (error) {
    }
}
export async function statsCopy(dispatch,setStats) {
    try {
        const response = await fetch(`${BASE_URL}copytrading/stats/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        dispatch(setStats(jsonData));
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}

export async function Mydepos(setDepos) {
    try {
        const response = await fetch(`${BASE_URL}strategies/my_deposited/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData)
        setDepos(jsonData);
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function listAllTraders(dispatch,setTraders) {
    try {
        const response = await fetch(`${BASE_URL}traders/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        dispatch(setTraders(jsonData));
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function listAllStrategies(dispatch,setStrategies) {
    try {
        const response = await fetch(`${BASE_URL}strategies/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        dispatch(setStrategies(jsonData));
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function listOpenTraderTx(setTx, id) {
    try {
        const response = await fetch(`${BASE_URL}traders/${id}/get_open_transactions/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setTx(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function listCloseTraderTx(setTx, id) {
    try {
        const response = await fetch(`${BASE_URL}traders/${id}/get_close_transactions/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setTx(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function MyInfo(setMyInfo) {
    try {
        const response = await fetch(`${BASE_URL}auth/users/me/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setMyInfo(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function MyTraders(setMyInfo) {
    try {
        const response = await fetch(`${BASE_URL}traders/my/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setMyInfo(jsonData.my_traders_copied_id)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function UserStats(setStats) {
    try {
        const response = await fetch(`${BASE_URL}auth/users_stats/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setStats(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function UsersTotalInfo(setInfo) {
    try {
        const response = await fetch(`${BASE_URL}auth/all_users_money/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setInfo(jsonData.total_wallet_sum)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function UsersInfo(setInfo) {
    try {
        const response = await fetch(`${BASE_URL}auth/users/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setInfo(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function ListAvailableStrategies(setList) {
    try {
        const response = await fetch(`${BASE_URL}strategies/list_available_strategies/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setList(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function listCrypto(setCryptoList) {
    try {
        const response = await fetch(`${BASE_URL}crypto/get_exchange_info/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setCryptoList(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}

export async function FollowTable(setFollowData) {
    try {
        const response = await fetch(`${BASE_URL}traders/last_followed_traders/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setFollowData(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function DepoTable(setDepoData) {
    try {
        const response = await fetch(`${BASE_URL}strategies/last_deposited_users/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setDepoData(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function PieChartData(setPie) {
    try {
        const response = await fetch(`${BASE_URL}crypto/get_all_cryptos_in_percentage/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setPie(jsonData)
    } catch (error) {
        console.error("Fetching data failed", error);
    }
}
export async function signIn(username, pass, setShowAlert) {
    const logdata = {
        'username': username,
        'password': pass
    };
    try {
        const response = await fetch(`${BASE_URL}auth/token/login/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logdata),
        });

        if (!response.ok) {
            setShowAlert(true);
        }
        else {
            const data = await response.json();
            cookies.set('key', data.auth_token, { path: '/' });
            window.location.href = BASE_FRONT + '/copytrading';
        }

    } catch (error) {
    }
}
export async function signOut() {

    try {
        const response = await fetch(`${BASE_URL}auth/token/logout/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
        });

        if (!response.ok) {
        }
        else {
            cookies.remove('key');
            window.location.href = BASE_FRONT;
        }

    } catch (error) {
    }
}
export async function CheckPingHeader(setPing) {

    if (getCookieValue('key')) {
        try {
            const response = await fetch(`${BASE_URL}auth/ping/`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `token ${getCookieValue('key')}`
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);

            }
            const jsonData = await response.json();
            if (jsonData.message !== 'good') {
                setPing(false);

            } else {

                setPing(true);
            }
        } catch (error) {
            console.error("Fetching data failed", error);
            setPing(false);

        }
    }
    else {


    }


}
export async function CheckPing(key) {
    if (key) {
        try {
            const response = await fetch(`${BASE_URL}auth/ping/`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `token ${key}`
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            return jsonData.message === 'good';
        } catch (error) {
            console.error("Fetching data failed", error);
            return false;
        }
    }
    return false;
}

export async function AddTrader(nickname, about, photo, strategiess, deposit) {
    const strategiesIdArray = strategiess.map(strategy => ({
        id: strategy.id,
        trader_deposit: strategy.trader_deposit
    }));

    const logdata = {
        'nickname': nickname,
        'about': about,
        'deposit':deposit,
        'strategies_id':strategiesIdArray
    };
    // If photo is not defined, send JSON data directly
    if (photo === null ) {
        try {
            const response = await fetch(`${BASE_URL}traders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getCookieValue('key')}`
                },
                body: JSON.stringify(logdata),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Trader added successfully:', data);
            } else {
                console.error('Failed to add trader');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        // If photo is defined, send FormData
        const strategiesIdArray = strategiess.map(strategy => ({
            id: strategy.id,
            trader_deposit: strategy.trader_deposit
        }));
        
        const formData = transformStrategiesArrayToFormData(strategiesIdArray);
    
        formData.append('nickname', nickname);
        formData.append('about', about);
        formData.append('deposit', deposit);
    
        if (photo !== null) {
            formData.append('photo', photo);
        }
        
        try {
            const response = await fetch(`${BASE_URL}traders/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${getCookieValue('key')}`
                },
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Trader added successfully:', data);
            } else {
                console.error('Failed to add trader');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}



export async function EditTrader(nickname, about, id, photo, strategiess,copiers,maxcopiers,isVisible,deposit) {
    let textData
    alert(copiers)
    if (strategiess) {
        const strategiesData = strategiess.map(item => ({
            id: item.id,
            trader_deposit: item.trader_deposit
        }));
        textData = {
            nickname: nickname,
            deposit:deposit,
            about: about,
            strategies_id: strategiesData,
            copiers_count:parseInt(copiers),
            max_copiers:maxcopiers,
            visible:isVisible
        };
    } else {
        textData = {
            deposit:deposit,
            nickname: nickname,
            about: about,
            copiers_count:parseInt(copiers),
            max_copiers:maxcopiers,
            visible:isVisible,
            strategies_id:[]

        };
    }


    if (photo) {
        // If "photo" exists, create a FormData object and append the photo
        const formData = new FormData();
        formData.append('photo', photo);

        // Append text data as key-value pairs to FormData
        Object.entries(textData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = getCookieValue('key');
            const response = await fetch(`${BASE_URL}traders/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Trader edited successfully:', data);
            } else {
                console.error('Failed to edit trader:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        // If "photo" doesn't exist, send text data as JSON
        try {
            const token = getCookieValue('key');
            const response = await fetch(`${BASE_URL}traders/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(textData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Trader edited successfully:', data);
            } else {
                console.error('Failed to edit trader:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


export async function fetchIsAdmin(setIsAdm) {
    try {
        const response = await fetch(`${BASE_URL}auth/is_admin/`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            },
        });
        const data = await response.json();

        setIsAdm(data.is_admin);
    } catch (error) {
        console.error('Error fetching isAdmin status:', error);

    }
}
const replaceNaNWithZero = (inputValues) => {
    return inputValues.map(item => ({
        ...item,
        value_change: isNaN(item.value_change) ? 0 : item.value_change
    }));
};

export async function EditStrategy(copiersCount, name, about, max_deposit, min_deposit, id, list,leftform, copiers, inputValues) {
    let logdata; // Declare logdata outside of the if statement
    console.log(inputValues)
    const filteredArray = list.filter(item => parseFloat(item.total_value) !== 0);
    const filteredArrayWithoutInitKeys = filteredArray.map(({ init_value, init_side, ...rest }) => rest);

    console.log(filteredArrayWithoutInitKeys,'loool')
    if (inputValues) {
        logdata = {
            'total_copiers': copiersCount,
            "name": name,
            "about": about,
            'cryptos': leftform,
            'new_cryptos':filteredArrayWithoutInitKeys,
            "max_deposit": max_deposit,
            "min_deposit": min_deposit,
            "max_users": copiers,
            'open_transaction_list': replaceNaNWithZero(inputValues)
        };
    } else {
        logdata = {
            'total_copiers': copiersCount,
            "name": name,
            "about": about,
            'cryptos': leftform,
            'new_cryptos':filteredArrayWithoutInitKeys,

            "max_deposit": max_deposit,
            "min_deposit": min_deposit,
            "max_users": copiers
        };
    }

    console.log(logdata);
    try {
        const response = await fetch(`${BASE_URL}strategies/${id}/`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`
            },
            body: JSON.stringify(logdata),
        });
        // Handle response if needed
    } catch (error) {
        // Handle error
    }
}

export async function DelTrader(id) {

    try {
        const response = await fetch(`${BASE_URL}traders/${id}/`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
        });




    } catch (error) {
    }
}

export async function CopyStrategy(id, amount) {
    const logdata =
    {
        "value": amount
    }
    try {
        const response = await fetch(`${BASE_URL}strategies/add/${id}/`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
            body: JSON.stringify(logdata),

        });




    } catch (error) {
    }
}
export async function DelStrategy(id) {

    try {
        const response = await fetch(`${BASE_URL}strategies/${id}/`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },

        });




    } catch (error) {
    }
}
export async function AddNewStrategy(name, about, max_deposit, min_deposit, list) {
    const updatedDepositAmounts = list.map(item => ({
        ...item,
        side: 'long'
      }));
      
    const logdata = {
        'name': name,
        'about': about,
        'max_deposit': max_deposit,
        'min_deposit': min_deposit,
        'cryptos': updatedDepositAmounts
    };
 
    try {
        const response = await fetch(`${BASE_URL}strategies/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
            body: JSON.stringify(logdata),
        });




    } catch (error) {
    }
}
export async function ChangeProfitPerc(perc,  id) {
    const logdata = {
        'new_percentage_change_profit': parseFloat(perc)

    };
    try {
        const response = await fetch(`${BASE_URL}strategies/change_avg_profit/${id}/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${getCookieValue('key')}`

            },
            body: JSON.stringify(logdata),
        });




    } catch (error) {
    }
}
export function getCookieValue(cookieName, req = null) {
    let cookieValue = null;

    // Server-side: Extract from request headers
    if (req && req.headers.cookie) {
        const cookies = req.headers.cookie;
        const cookie = cookies.split(';').find(c => c.trim().startsWith(`${cookieName}=`));
        if (cookie) {
            cookieValue = cookie.split('=')[1];
        }
    }
    // Client-side: Use document.cookie
    else if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(`${cookieName}=`));
        if (cookie) {
            cookieValue = cookie.split('=')[1];
        }
    }

    return cookieValue;
}