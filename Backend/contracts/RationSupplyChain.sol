// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//solidity 
contract RationSupplyChain {
    struct Transaction {
        string txHash;
        string timestamp;
        string from;
        string to;
        string grain;
        uint256 quantity;
        string txType;
    }
    
    Transaction[] public transactions;
    
    event TransactionRecorded(
        string txHash,
        string timestamp,
        string from,
        string to,
        string grain,
        uint256 quantity,
        string txType
    );
    
    function recordTransaction(
        string memory _timestamp,
        string memory _from,
        string memory _to,
        string memory _grain,
        uint256 _quantity,
        string memory _txType
    ) public returns (string memory) {
        string memory txHash = generateHash(_from, _to, _grain, _quantity);
        
        Transaction memory newTx = Transaction({
            txHash: txHash,
            timestamp: _timestamp,
            from: _from,
            to: _to,
            grain: _grain,
            quantity: _quantity,
            txType: _txType
        });
        
        transactions.push(newTx);
        
        emit TransactionRecorded(
            txHash,
            _timestamp,
            _from,
            _to,
            _grain,
            _quantity,
            _txType
        );
        
        return txHash;
    }
    
    function generateHash(
        string memory _from,
        string memory _to,
        string memory _grain,
        uint256 _quantity
    ) private view returns (string memory) {
        return string(abi.encodePacked(
            "0x",
            toHexString(uint256(keccak256(abi.encodePacked(
                _from, _to, _grain, _quantity, block.timestamp
            ))))
        ));
    }
    
    function toHexString(uint256 value) private pure returns (string memory) {
        bytes memory buffer = new bytes(64);
        for (uint256 i = 63; i > 0; i--) {
            buffer[i] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
            if (value == 0) break;
        }
        return string(buffer);
    }
    
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
    
    function getTransaction(uint256 index) public view returns (
        string memory txHash,
        string memory timestamp,
        string memory from,
        string memory to,
        string memory grain,
        uint256 quantity,
        string memory txType
    ) {
        require(index < transactions.length, "Transaction does not exist");
        Transaction memory tx = transactions[index];
        return (tx.txHash, tx.timestamp, tx.from, tx.to, tx.grain, tx.quantity, tx.txType);
    }
}
