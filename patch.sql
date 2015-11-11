CREATE OR REPLACE FUNCTION inserturl2(
_cid int,
_tit varchar,
_des varchar,
_url varchar,
_scheme varchar,
_host varchar,
_path varchar,
_query varchar)
  RETURNS integer AS
$BODY$
declare _OID int; _EID int; _SID int; _MD5URL varchar(32);_UID int;_co int;
begin
	select md5(_url) into _MD5URL;
	select uid from URL where MD5URL=_MD5URL into _UID;
	if _UID is null then 
		select EID from Entity where EName = 'URL' into _EID;
		select insertobj(_EID,_tit,_des) into _OID;
		select SID from URLScheme where Scheme = _scheme into _SID;
		insert into URL(UID,Scheme,HostName,Path,MD5URL,queryget) 
		values(_OID,_SID,_host,_path,_MD5URL,_query);
	end if;

	select oid from co where cid=_cid and oid=_OID into _co;
	if _co is null then 
		insert into co(cid,oid) values(_cid,_OID);
	end if;
  return _OID;
end;
$BODY$
LANGUAGE plpgsql;


drop function IF EXISTS insertclass(
    _pcid integer,
    _type integer,
    _cname character varying,
    _ename character varying);

drop function  IF EXISTS insertclass(
    _namepath character varying,
    _cname character varying);