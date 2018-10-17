class UserDataClass{
	private data:Object;
	private session:Object;
    private custom:Object;
	private nick:Object;

    constructor(){
    	this.data = null;
		this.session = null;
		this.custom = [];
		this.nick = null;
    }

    public getUserData(key:string){
		if(key){
	        return this.data[key];
		}else{
			return this.data;
		}
    }

    public setUserData(d){
        this.data = d;
    }
	public setUserDataByKey(k,d){
		this.data[k] = d;
	}
	public setUserDataBy_data_key(k,d,y){
		this.data[y][k] = d;
	}
	public getUserDataBy_data_key(k,y){
		return this.data[y][k]
	}
	public setSessionData(s){
		this.session = s
	}

	public setnickData(k,d){
		this.nick[k] = d;
	}

	public getSessionData(key:string){
        return this.session[key];	
	}

	public getnickData(key:string){
        return this.nick[key];	
	}

	public setCustomByKey(key,v){
		this.custom[key] = v
	}

	public getCustomByKey(key:string){
		return this.custom[key]
	}
}


