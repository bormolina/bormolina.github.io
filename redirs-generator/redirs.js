function generate_redirs(){

    const commons = `rewrite ^/static/Validador /accesibilidad redirect;
rewrite ^/pages/privacidad /condiciones-legales redirect;
rewrite ^/pages/mapa /sitemap redirect;
rewrite ^/pages  / redirect;
rewrite ^/static / redirect;
rewrite ^/index.php(.*) /$1 redirect; 
    `.trim()

    const ta_input = document.getElementById('input')
    const cb_pages = document.getElementById('check-pages')
    const cb_common = document.getElementById('check-common')
    const ta_output = document.getElementById('output')
    const text = ta_input.value.split('\n')

    let appendex = ''
    if(cb_pages.checked){
        appendex = '^pages/'
    }
    
    const output = text.map(x=>{
        const parts = x.split(',')
        return `rewrite ${appendex}${parts[0]} ${parts[1]} redirect;`
    })
    
    let output2 = output.join('\n')
    if(cb_common.checked){
        output2 += '\n'+commons  
    }
    ta_output.value = output2
}