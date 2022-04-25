const abi = JSON.parse('[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');

var contract;
var signer;
async function connect() {
    var { ethereum } = window;
    if (!ethereum) {
        alert("No crypto wallet found. Please install it.");
        return false;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract('0x55d398326f99059fF775485246999027B3197955', abi, signer); //0xCd2cC03f07bA28180fE26Ae288CFAa30f089EeF8 // 0xA48A164b5a3dD9c2bf0cAf717f59EA0Be9180c9c
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(56).toString(16)}` }], // chainId must be in hexadecimal numbers
    })
    var name = await contract.name();
    $("#res_name").text(name);
    var symbol = await contract.symbol();
    $("#res_symbol").text(symbol);
    var decimals = await contract.decimals();
    $("#res_decimals").text(decimals);
    var totalSupply = await contract.totalSupply();
    $("#res_totalSupply").text(totalSupply);
    var owner = await contract.owner();
    $("#res_owner").text(owner);
    var paused = await contract.paused();
    $("#res_paused").text(paused);
    var taxStatus = await contract.taxStatus();
    $("#res_taxStatus").text(taxStatus);
}

window.ethereum.on("accountsChanged", function () {
    connect();
});

function isConnected() {
    if (!contract) {
        return false;
    } else {
        return true;
    }
}

async function read_allowance() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    var allowance = await contract.allowance($("#allowance_owner").val(), $("#allowance_spender").val());
    $("#res_allowance").text(allowance.toString(10));
}

async function read_balanceOf() {
    alert(signer._address);
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    var balance = await contract.balanceOf($("#balanceOf_account").val());
    $("#res_balanceOf").text(balance.toString(10));
}

async function read_isBlacklisted() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    var result = await contract.isBlacklisted($("#isBlacklisted_account").val());
    $("#res_isBlacklisted").text(result);
}

async function read_isExcluded() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    var result = await contract.isExcluded($("#isExcluded_account").val());
    $("#res_isExcluded").text(result);
}

async function write_approve() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.approve($("#approve_spender").val(), $("#approve_amount").val()).then(result => {
            if (result) {
                $("#res_approve").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_approve").text("fail");
        }
    }
}

async function write_burn() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.burn($("#burn_amount").val()).then(result => {
            if (result) {
                $("#res_burn").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_burn").text("fail");
        }
    }
}

async function write_decreaseAllowance() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.decreaseAllowance($("#decreaseAllowance_spender").val(), $("#decreaseAllowance_subtractedValue").val()).then(result => {
            if (result) {
                $("#res_decreaseAllowance").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_decreaseAllowance").text("fail");
        }
    }
}

// async function write_disableBlicklist() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.disableBlicklist($("#disableBlicklist_account").val()).then(result => {
//             if (result) {
//                 $("#res_disableBlicklist").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_disableBlicklist").text("fail");
//         }
//     }
// }

// async function write_enableBlicklist() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.enableBlicklist($("#enableBlicklist_account").val()).then(result => {
//             if (result) {
//                 $("#res_enableBlicklist").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_enableBlicklist").text("fail");
//         }
//     }
// }

// async function write_exclude() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.exclude($("#exclude_account").val()).then(result => {
//             if (result) {
//                 $("#res_exclude").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_exclude").text("fail");
//         }
//     }
// }

async function write_increaseAllowance() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.increaseAllowance($("#increaseAllowance_spender").val(), $("#increaseAllowance_addedValue").val()).then(result => {
            if (result) {
                $("#res_increaseAllowance").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_increaseAllowance").text("fail");
        }
    }
}

// async function write_removeExclude() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.removeExclude($("#removeExclude_account").val()).then(result => {
//             if (result) {
//                 $("#res_removeExclude").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_removeExclude").text("fail");
//         }
//     }
// }

// async function write_setBuyTax() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.setBuyTax($("#setBuyTax_dev").val(), $("#setBuyTax_marketing").val(), $("#setBuyTax_liquidity").val(), $("#setBuyTax_charity").val()).then(result => {
//             if (result) {
//                 $("#res_setBuyTax").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_setBuyTax").text("fail");
//         }
//     }
// }

// async function write_setSellTax() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.setSellTax($("#setSellTax_dev").val(), $("#setSellTax_marketing").val(), $("#setSellTax_liquidity").val(), $("#setSellTax_charity").val()).then(result => {
//             if (result) {
//                 $("#res_setSellTax").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_setSellTax").text("fail");
//         }
//     }
// }

// async function write_setTaxWallet() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.setTaxWallet($("#setTaxWallet_dev").val(), $("#setTaxWallet_marketing").val(), $("#setTaxWallet_charity").val()).then(result => {
//             if (result) {
//                 $("#res_setTaxWallet").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_setTaxWallet").text("fail");
//         }
//     }
// }

async function write_transfer() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.transfer($("#transfer_recipient").val(), $("#transfer_amount").val()).then(result => {
            if (result) {
                $("#res_transfer").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_transfer").text("fail");
        }
    }
}

async function write_transferFrom() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.transferFrom($("#transferFrom_sender").val(), $("#transferFrom_recipient").val(), $("#transferFrom_amount").val()).then(result => {
            if (result) {
                $("#res_transferFrom").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_transferFrom").text("fail");
        }
    }
}

async function write_transferOwnership() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.transferOwnership($("#transferOwnership_newOwner").val()).then(result => {
            if (result) {
                $("#res_transferOwnership").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_transferOwnership").text("fail");
        }
    }
}

async function write_renounceOwnership() {
    if (!isConnected()) {
        alert("Please connect on wallet.");
        return false;
    }
    try {
        await contract.renounceOwnership().then(result => {
            if (result) {
                $("#res_renounceOwnership").text("success");
            }
        });
    } catch (err) {
        if (err) {
            $("#res_renounceOwnership").text("fail");
        }
    }
}

// async function write_enableTax() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.enableTax().then(result => {
//             if (result) {
//                 $("#res_enableTax").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_enableTax").text("fail");
//         }
//     }
// }

// async function write_disableTax() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.disableTax().then(result => {
//             if (result) {
//                 $("#res_disableTax").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_disableTax").text("fail");
//         }
//     }
// }

// async function write_triggerTax() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.triggerTax().then(result => {
//             if (result) {
//                 $("#res_triggerTax").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_triggerTax").text("fail");
//         }
//     }
// }

// async function write_pause() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.pause().then(result => {
//             if (result) {
//                 $("#res_pause").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_pause").text("fail");
//         }
//     }
// }

// async function write_unpause() {
//     if (!isConnected()) {
//         alert("Please connect on wallet.");
//         return false;
//     }
//     try {
//         await contract.unpause().then(result => {
//             if (result) {
//                 $("#res_unpause").text("success");
//             }
//         });
//     } catch (err) {
//         if (err) {
//             $("#res_unpause").text("fail");
//         }
//     }
// }