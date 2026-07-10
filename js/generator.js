// Bold Text Generator - Pure Unicode Mode with Object Mapping
(function() {
    'use strict';

    // Unicode character mappings using object mapping to avoid surrogate pair issues
    const unicodeMappings = {
        // 1. Mathematical Bold (serif)
        mathBold: {
            name: 'Bold',
            map: {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆',
                'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍',
                'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔',
                'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
                'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠',
                'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧',
                'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮',
                'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
                '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒',
                '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
            }
        },
        
        // 2. Mathematical Italic
        mathItalic: {
            name: 'Italic',
            map: {
                'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺',
                'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁',
                'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈',
                'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
                'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔',
                'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛',
                'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢',
                'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 3. Mathematical Bold Italic
        mathBoldItalic: {
            name: 'Bold Italic',
            map: {
                'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮',
                'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵',
                'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼',
                'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
                'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈',
                'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏',
                'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖',
                'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 4. Sans-serif
        sans: {
            name: 'Sans-serif',
            map: {
                'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦',
                'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭',
                'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴',
                'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹',
                'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀',
                'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇',
                'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎',
                'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓',
                '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦',
                '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫'
            }
        },
        
        // 5. Sans-serif Bold
        sansBold: {
            name: 'Sans Bold',
            map: {
                'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚',
                'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡',
                'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨',
                'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
                'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴',
                'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻',
                'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂',
                'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
                '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰',
                '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
            }
        },
        
        // 6. Sans-serif Italic
        sansItalic: {
            name: 'Sans Italic',
            map: {
                'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎',
                'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕',
                'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜',
                'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
                'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨',
                'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯',
                'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶',
                'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 7. Sans-serif Bold Italic
        sansBoldItalic: {
            name: 'Sans Bold Italic',
            map: {
                'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂',
                'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉',
                'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐',
                'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
                'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜',
                'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣',
                'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪',
                'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 8. Script
        script: {
            name: 'Script',
            map: {
                'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
                'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
                'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
                'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
                'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ',
                'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃',
                'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊',
                'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 9. Script Bold
        scriptBold: {
            name: 'Bold Script',
            map: {
                'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖',
                'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝',
                'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤',
                'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
                'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰',
                'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷',
                'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾',
                'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 10. Fraktur
        fraktur: {
            name: 'Fraktur',
            map: {
                'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊',
                'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑',
                'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘',
                'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
                'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤',
                'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫',
                'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲',
                'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 11. Fraktur Bold
        frakturBold: {
            name: 'Bold Fraktur',
            map: {
                'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲',
                'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹',
                'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀',
                'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
                'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌',
                'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓',
                'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚',
                'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 12. Monospace
        monospace: {
            name: 'Monospace',
            map: {
                'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶',
                'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽',
                'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄',
                'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
                'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐',
                'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗',
                'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞',
                'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
                '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺',
                '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
            }
        },
        
        // 13. Double-struck
        doubleStruck: {
            name: 'Double-struck',
            map: {
                'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾',
                'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ',
                'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌',
                'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
                'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘',
                'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟',
                'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦',
                'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
                '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜',
                '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
            }
        },
        
        // 14. Circled Letters
        circled: {
            name: 'Circled',
            map: {
                'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ',
                'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ',
                'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ',
                'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ',
                'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ',
                'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ',
                'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
                '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④',
                '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
            }
        },
        
        // 15. Parenthesized
        parenthesized: {
            name: 'Parenthesized',
            map: {
                'A': '🄐', 'B': '🄑', 'C': '🄒', 'D': '🄓', 'E': '🄔', 'F': '🄕', 'G': '🄖',
                'H': '🄗', 'I': '🄘', 'J': '🄙', 'K': '🄚', 'L': '🄛', 'M': '🄜', 'N': '🄝',
                'O': '🄞', 'P': '🄟', 'Q': '🄠', 'R': '🄡', 'S': '🄢', 'T': '🄣', 'U': '🄤',
                'V': '🄥', 'W': '🄦', 'X': '🄧', 'Y': '🄨', 'Z': '🄩',
                'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢',
                'h': '⒣', 'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩',
                'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰',
                'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵',
                '0': '0', '1': '⑴', '2': '⑵', '3': '⑶', '4': '⑷',
                '5': '⑸', '6': '⑹', '7': '⑺', '8': '⑻', '9': '⑼'
            }
        },
        
        // 16. Fullwidth
        fullwidth: {
            name: 'Fullwidth',
            map: {
                'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ',
                'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ',
                'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ',
                'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
                'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ',
                'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ',
                'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ',
                'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
                '0': '０', '1': '１', '2': '２', '3': '３', '4': '４',
                '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
                ' ': '　' // Fullwidth space
            }
        },
        
        // 17. Small Caps
        smallCaps: {
            name: 'Small Caps',
            map: {
                'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G',
                'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N',
                'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U',
                'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
                'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ',
                'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ',
                'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ',
                'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 18. Underlined (using combining underline)
        underlined: {
            name: 'Underlined',
            map: {} // Will be handled specially in conversion function
        },
        
        // 19. Strikethrough (using combining strikethrough)
        strikethrough: {
            name: 'Strikethrough',
            map: {} // Will be handled specially in conversion function
        },
        
        // 20. Overlined (using combining overline)
        overlined: {
            name: 'Overlined',
            map: {} // Will be handled specially in conversion function
        },
        
        // 21. Squared Letters
        squared: {
            name: 'Squared',
            map: {
                'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶',
                'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽',
                'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄',
                'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
                'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶',
                'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽',
                'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄',
                'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 22. Negative Squared
        negativeSquared: {
            name: 'Negative Squared',
            map: {
                'A': '🅰', 'B': '🅱', 'C': '🅲', 'D': '🅳', 'E': '🅴', 'F': '🅵', 'G': '🅶',
                'H': '🅷', 'I': '🅸', 'J': '🅹', 'K': '🅺', 'L': '🅻', 'M': '🅼', 'N': '🅽',
                'O': '🅾', 'P': '🅿', 'Q': '🆀', 'R': '🆁', 'S': '🆂', 'T': '🆃', 'U': '🆄',
                'V': '🆅', 'W': '🆆', 'X': '🆇', 'Y': '🆈', 'Z': '🆉',
                'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶',
                'h': '🅷', 'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼', 'n': '🅽',
                'o': '🅾', 'p': '🅿', 'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄',
                'v': '🆅', 'w': '🆆', 'x': '🆇', 'y': '🆈', 'z': '🆉',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 23. Superscript
        superscript: {
            name: 'Superscript',
            map: {
                'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ',
                'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ',
                'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ',
                'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
                'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ',
                'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ',
                'o': 'ᵒ', 'p': 'ᵖ', 'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
                'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
                '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
                '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
            }
        },
        
        // 24. Subscript
        subscript: {
            name: 'Subscript',
            map: {
                'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G',
                'H': 'H', 'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N',
                'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U',
                'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
                'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ₑ', 'f': 'f', 'g': 'g',
                'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ',
                'o': 'ₒ', 'p': 'ₚ', 'q': 'q', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
                'v': 'ᵥ', 'w': 'w', 'x': 'ₓ', 'y': 'y', 'z': 'z',
                '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
                '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
            }
        },
        
        // 25. Inverted (Upside Down)
        inverted: {
            name: 'Inverted',
            map: {
                'A': '∀', 'B': 'ꓭ', 'C': 'Ↄ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
                'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ꓘ', 'L': '⅂', 'M': 'W', 'N': 'N',
                'O': 'O', 'P': 'Ԁ', 'Q': 'Ꝺ', 'R': 'ꓤ', 'S': 'S', 'T': '⊥', 'U': '∩',
                'V': 'ᴧ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
                'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
                'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
                'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
                'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
                '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
                '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6'
            }
        },
        
        // 26. Reversed (Mirror)
        reversed: {
            name: 'Reversed',
            map: {
                'A': 'A', 'B': 'ꓭ', 'C': 'Ↄ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꓞ', 'G': 'Ꭾ',
                'H': 'H', 'I': 'I', 'J': 'Ⴑ', 'K': 'ꓘ', 'L': '⅃', 'M': 'M', 'N': 'И',
                'O': 'O', 'P': 'ꓑ', 'Q': 'Ϙ', 'R': 'ꓤ', 'S': 'Ƨ', 'T': 'T', 'U': 'U',
                'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ƹ',
                'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ϱ',
                'h': 'ʜ', 'i': 'i', 'j': 'Ⴑ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n',
                'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'u',
                'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'ƹ',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 27. Gothic Bold
        gothicBold: {
            name: 'Gothic Bold',
            map: {
                'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲',
                'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹',
                'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀',
                'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
                'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌',
                'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓',
                'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚',
                'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        },
        
        // 28. Dotted
        dotted: {
            name: 'Dotted',
            map: {} // Will be handled specially in conversion function
        },
        
        // 29. Wavy
        wavy: {
            name: 'Wavy',
            map: {} // Will be handled specially in conversion function
        },
        
        // 30. Cursive
        cursive: {
            name: 'Cursive',
            map: {
                'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
                'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
                'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
                'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
                'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ',
                'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃',
                'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊',
                'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
            }
        }
    };

    const inputText = document.getElementById('input-text');
    const outputContainer = document.getElementById('styles-output');
    const charCount = document.querySelector('.char-count');
    const resultCount = document.querySelector('.result-count');
    const copyStatus = document.querySelector('.copy-status');
    const clearBtn = document.querySelector('.clear-btn');
    const sampleBtn = document.querySelector('.sample-btn');
    const plainBtn = document.querySelector('.plain-btn');
    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));

    if (!inputText || !outputContainer || !charCount || !resultCount) return;

    const SAMPLE_TEXT = 'Make this bold';
    const MAX_LENGTH = Number(inputText.getAttribute('maxlength')) || 500;
    const boldStyleNames = [
        'mathBold',
        'mathBoldItalic',
        'sansBold',
        'sansBoldItalic',
        'scriptBold',
        'frakturBold',
        'gothicBold',
        'doubleStruck'
    ];
    const effectMarks = new Set(['\u0332', '\u0336', '\u0305', '\u0307', '\u0303']);
    const reverseMappings = new Map();
    let activeFilter = 'bold';

    Object.values(unicodeMappings).forEach(function (style) {
        Object.entries(style.map).forEach(function (entry) {
            const plainCharacter = entry[0];
            const styledCharacter = entry[1];

            if (styledCharacter !== plainCharacter && !reverseMappings.has(styledCharacter)) {
                reverseMappings.set(styledCharacter, plainCharacter);
            }
        });
    });

    function convertToUnicode(text, styleName) {
        if (!text) return text;

        const style = unicodeMappings[styleName];
        if (!style) return text;

        const combiningMarks = {
            underlined: '\u0332',
            strikethrough: '\u0336',
            overlined: '\u0305',
            dotted: '\u0307',
            wavy: '\u0303'
        };

        if (combiningMarks[styleName]) {
            return Array.from(text).map(function (character) {
                return /\s/.test(character) ? character : character + combiningMarks[styleName];
            }).join('');
        }

        return Array.from(text).map(function (character) {
            return style.map[character] || character;
        }).join('');
    }

    function normalizeToPlain(text) {
        return Array.from(text).filter(function (character) {
            return !effectMarks.has(character);
        }).map(function (character) {
            return reverseMappings.get(character) || character;
        }).join('');
    }

    function getVisibleStyleNames() {
        return activeFilter === 'all' ? Object.keys(unicodeMappings) : boldStyleNames;
    }

    function createUnicodeCard(text, styleName) {
        const style = unicodeMappings[styleName];
        const convertedText = convertToUnicode(text, styleName);
        const card = document.createElement('article');
        const info = document.createElement('div');
        const name = document.createElement('span');
        const output = document.createElement('span');
        const copyButton = document.createElement('button');

        card.className = 'unicode-card';
        info.className = 'unicode-info';
        name.className = 'unicode-name';
        output.className = 'unicode-text';
        copyButton.className = 'copy-btn';
        copyButton.type = 'button';

        name.textContent = style.name;
        output.textContent = convertedText;
        copyButton.textContent = 'Copy ' + style.name;
        copyButton.setAttribute('aria-label', 'Copy ' + style.name + ' text');

        copyButton.addEventListener('click', function () {
            copyToClipboard(convertedText, copyButton, style.name);
        });

        info.append(name, output);
        card.append(info, copyButton);
        return card;
    }

    function copyToClipboard(text, button, styleName) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                showCopySuccess(button, styleName);
            }).catch(function () {
                fallbackCopy(text, button, styleName);
            });
            return;
        }

        fallbackCopy(text, button, styleName);
    }

    function fallbackCopy(text, button, styleName) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            if (document.execCommand('copy')) {
                showCopySuccess(button, styleName);
            }
        } finally {
            textarea.remove();
        }
    }

    function showCopySuccess(button, styleName) {
        button.classList.add('copied');
        button.textContent = 'Copied';

        if (copyStatus) {
            copyStatus.textContent = styleName + ' text copied to the clipboard.';
        }

        if (typeof window.gtag === 'function') {
            window.gtag('event', 'copy_text_style', { style_name: styleName });
        }

        window.setTimeout(function () {
            button.classList.remove('copied');
            button.textContent = 'Copy ' + styleName;
        }, 1600);
    }

    function createPlaceholder() {
        const placeholder = document.createElement('div');
        const message = document.createElement('p');
        placeholder.className = 'style-placeholder';
        message.textContent = 'Enter text to preview the available styles.';
        placeholder.appendChild(message);
        return placeholder;
    }

    function renderStyles() {
        const text = inputText.value;
        const styleNames = getVisibleStyleNames();
        const fragment = document.createDocumentFragment();

        outputContainer.setAttribute('aria-busy', 'true');

        if (!text.trim()) {
            outputContainer.replaceChildren(createPlaceholder());
            resultCount.textContent = '0 results';
            outputContainer.setAttribute('aria-busy', 'false');
            return;
        }

        styleNames.forEach(function (styleName) {
            fragment.appendChild(createUnicodeCard(text, styleName));
        });

        outputContainer.replaceChildren(fragment);
        resultCount.textContent = styleNames.length + ' results';
        outputContainer.setAttribute('aria-busy', 'false');
    }

    function updateCharacterCount() {
        const count = Array.from(inputText.value).length;
        charCount.textContent = count + ' / ' + MAX_LENGTH + ' characters';
    }

    function updateInput(nextValue) {
        inputText.value = nextValue;
        updateCharacterCount();
        renderStyles();
    }

    function setFilter(nextFilter) {
        activeFilter = nextFilter === 'all' ? 'all' : 'bold';

        filterButtons.forEach(function (button) {
            const isActive = button.dataset.filter === activeFilter;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        renderStyles();
    }

    inputText.addEventListener('input', function () {
        updateCharacterCount();
        renderStyles();
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            updateInput('');
            inputText.focus();
        });
    }

    if (sampleBtn) {
        sampleBtn.addEventListener('click', function () {
            updateInput(SAMPLE_TEXT);
            inputText.focus();
            inputText.select();
        });
    }

    if (plainBtn) {
        plainBtn.addEventListener('click', function () {
            updateInput(normalizeToPlain(inputText.value));
            inputText.focus();
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setFilter(button.dataset.filter);
        });
    });

    updateCharacterCount();
    renderStyles();

})();
