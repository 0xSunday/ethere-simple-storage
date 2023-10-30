// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract SimpleStorage {
    
    uint256 public favoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;
    mapping(uint256 => string) public favoriteNumberToName;
    struct People {
        uint256 fn;
        string name;
    }
    People[] public people;

    function store(uint256 _fn) public virtual {
        favoriteNumber = _fn;
    }

    function addPerson(uint256 _fn, string memory _nm) public {
        people.push(People(_fn, _nm));
        nameToFavoriteNumber[_nm] = _fn;
        favoriteNumberToName[_fn] = _nm;
    }
}
