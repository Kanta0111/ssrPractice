import BFFConst from '../../../bff/const';
import { AuthorityLevel } from '../redux/modules/login';

export function checkAuthorityLevel(own: AuthorityLevel, required: AuthorityLevel) {
    console.log("checkAuthority", own, required);
    switch(required){
        case BFFConst.AUTHORITY_ADMIN:
            if (own === BFFConst.AUTHORITY_ADMIN) return true;
            return false;
        case BFFConst.AUTHORITY_MEMBER:
            if (own === BFFConst.AUTHORITY_ADMIN
                || own === BFFConst.AUTHORITY_MEMBER)
            return true;
            return false;
        case BFFConst.AUTHORITY_FREE:
            return true;
        default :
            console.log("case default")
            return false;
    }
}