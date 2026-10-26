(function(){
const names=["TAO AI Super Machine","Executive Career & Opportunities","Real Estate & Licensing","Aloha Mandalas / Amazon KDP","YouTube & Social Media","Body & Soul Plant-Based Kitchen","Housing & Financial Assistance","Taxes & Financial Administration","AquaO3 Business Development"];
const key="tao-project-links-v1";
let projects;
try{projects=JSON.parse(localStorage.getItem(key))}catch(e){}
if(!Array.isArray(projects))projects=names.map(name=>({name,url:""}));
const section=document.createElement("section");
section.className="panel";
section.innerHTML='<h2>📁 My Projects</h2><p class="muted">Open your existing projects. Tap Edit to add each direct link.</p><div id="projectTiles" class="grid"></div><input id="newProjectName" placeholder="New project name"><input id="newProjectUrl" placeholder="Project link (https://...)"><button class="primary wide" id="addProjectBtn">+ Add Project</button>';
const main=document.querySelector("main");
const agents=document.getElementById("agents");
if(!main||!agents)return;
main.insertBefore(section,agents.closest("section"));
const tiles=section.querySelector("#projectTiles");
function save(){localStorage.setItem(key,JSON.stringify(projects));render()}
function valid(url){try{const u=new URL(url);return u.protocol==="https:"||u.protocol==="http:"}catch(e){return false}}
function render(){
tiles.replaceChildren();
projects.forEach((p,i)=>{
const card=document.createElement("div");card.style.cssText="background:#26395b;border-radius:12px;padding:12px";
const name=document.createElement("b");name.textContent=p.name;name.style.cssText="display:block;margin-bottom:10px";
const actions=document.createElement("div");actions.style.cssText="display:flex;gap:6px";
const open=document.createElement("button");open.textContent="Open";open.disabled=!valid(p.url);open.style.cssText="flex:1;text-align:center;background:#47dce8;color:#10182c;font-weight:bold";open.onclick=()=>{if(valid(p.url))window.open(p.url,"_blank")};
const edit=document.createElement("button");edit.textContent="Edit";edit.style.flex="1";edit.onclick=()=>{const name=prompt("Project name",p.name);if(name===null||!name.trim())return;const url=prompt("Paste direct project URL",p.url);if(url===null)return;if(url.trim()&&!valid(url.trim())){alert("Enter a valid http or https link");return}projects[i]={name:name.trim(),url:url.trim()};save()};
const remove=document.createElement("button");remove.textContent="×";remove.onclick=()=>{if(confirm("Remove project shortcut?")){projects.splice(i,1);save()}};
actions.append(open,edit,remove);card.append(name,actions);tiles.append(card);
});
}
section.querySelector("#addProjectBtn").onclick=()=>{
const n=section.querySelector("#newProjectName"),u=section.querySelector("#newProjectUrl");
const name=n.value.trim(),url=u.value.trim();
if(!name){alert("Enter a project name");return}
if(url&&!valid(url)){alert("Enter a valid link");return}
projects.push({name,url});n.value="";u.value="";save();
};
render();
})();
